import { Box, Grid, Input, Stack, Group, Button, Image, Checkbox, FileInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getDesignById , putDesign} from '../services/Design';
import { Modal } from '@mantine/core';
import { getImageById } from '../services/Images';
import { putImage } from "../services/Images";
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

export const FormPutDesign = () => {

  const form = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [design, setDesign] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]); // IDs of selected images
  const [selectedImageData, setSelectedImageData] = useState([]); // Data for selected images
  const [uploadedImages, setUploadedImages] = useState([]);  // Base64 of uploaded images
  const [opened, setOpened,] = useState(false);
  const [openedUploaded, setOpenedUploaded] = useState(false);
  const [openedImageEditModal, setOpenedImageEditModal] = useState(false);
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);

  const handleClick = () => {
    navigate('/listDesign'); 
  };

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await getDesignById(id);
        setDesign(response);
      } catch (error) {
        console.error('Error al obtener el disign:', error);
      }
    };

    fetchDesign();
  }, [id]);
 const handleImageSelection = (imageId) => {
    const newSelectedImages = [...selectedImages];
    if (newSelectedImages.includes(imageId)) {
      const indexToRemove = newSelectedImages.indexOf(imageId);
      newSelectedImages.splice(indexToRemove, 1);
    } else {
      newSelectedImages.push(imageId);
    }
    setSelectedImages(newSelectedImages);

    // Fetch image data for the newly selected images only
    fetchSelectedImageData(newSelectedImages.filter(id => !selectedImageData.some(data => data.id === id)));
  };

  const fetchSelectedImageData = async (selectedImageIds) => {
    const imagePromises = selectedImageIds.map(async (imageId) => {
      const imageData = await getImageById(imageId);
      return imageData;
    });

    const imageData = await Promise.all(imagePromises);
    setSelectedImageData([...selectedImageData, ...imageData]); // Append new data to existing
  };

  const handleCancelModal = () => {
    // Clear selected images when the modal is closed using the cancel button
    setSelectedImages([]);
    setOpened(false);
  };

  const handleOpenImageEditModal = () => {
    // Implement logic to prepare data needed for editing (e.g., pre-fill editing tools)
    setOpenedImageEditModal(true);
  };

  const handleCloseImageEditModal = () => {
    setOpenedImageEditModal(false);
  };

 

  const handleConfirm = () => {
    if (selectedImages.length > 0) {
      setShowAdditionalInput(true);
      setOpened(false);
  
      // Datos actualizados de la publicidad (obtienes estos datos de tu formulario)
      const updatedDesignData = {
        title: form.getValues('title') ? form.getValues('title') : design?.title,
        content : form.getValues('content')? form.getValues('content') : design?.content,
        // ... otros campos que quieras actualizar
      };
  
      // Array para almacenar las promesas de las peticiones PUT
      const putPromises = [];
  
      // Loop through selected images
      selectedImages.forEach((imageId, index) => {
        const base64 = uploadedImages[index];
  
        // Crear la solicitud PUT para actualizar la imagen
        const putImagePromise = putImage({ base64, principal: true }, imageId);
        putPromises.push(putImagePromise);
      });
  
      // Crear la solicitud PUT para actualizar la publicidad
      const putDesignPromise = putDesign( updatedDesignData , id);
      putPromises.push(putDesignPromise);
  
      // Ejecutar todas las promesas en paralelo
      Promise.all(putPromises)
      .then((r) => {
        const [ imageR1, imageR2 ] = r;
        if(!imageR1?.stack && !imageR2?.stack) {
          notifications.show({
            title: 'Exito',
            message: 'Design modificado exitosamente',
            color: 'green',
          });
          navigate('/listDesign');
        }
      }        
      )
        .catch((error) => {
          console.error('Error al modificar las imágenes o el design:', error);
        });
    } else {
      const updatedDesignData = {
        title: form.getValues('title') ? form.getValues('title') : design?.title,
        content : form.getValues('content')? form.getValues('content') : design?.content,
        // ... otros campos que quieras actualizar
      };

      const putDesignPromise = putDesign(updatedDesignData , id)

      putDesignPromise
      .then((response) => {
        console.log('Imágenes y design modificados exitosamente');
        if(response?.stack) {
          notifications.show({
            title: 'Error',
            message: response?.message,
            color: 'red',
          });
        } else {
          notifications.show({
            title: 'Exito',
            message: 'Design modificado exitosamente',
            color: 'green',
          });
          handleClick();
        }
      })
      .catch((error) => {
        console.error('Error al modificar las imágenes o el design:', error);
      });
    // Mostrar un mensaje al usuario indicando que debe seleccionar al menos una imagen
  }
};
    
  console.log('Selected image IDs:', selectedImages);
  console.log('Uploaded image base64:', uploadedImages);
  console.log(uploadedImages);

  return (
    <Box>
      <Grid>
        <Grid.Col p={'10rem'}>
          <Stack>
            <h2>
              {'Modificar Design'}
            </h2>
            <Group>
              <FormProvider {...form}>
                <Input.Wrapper
                  label="Nombre del Design"
                >
                  <Input
                    {...form.register('title')}
                    defaultValue={design.title}
                    placeholder="Nombre del design"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Contenido"
                >
                  <Input
                    {...form.register('content')}
                    defaultValue={design.content}
                    placeholder="Contenido"
                  />
                </Input.Wrapper>
                <Button
                  onClick={() => {
                    setOpened(true);
                  }}
                >
                  {'Ver imagenes'}
                </Button>
                {showAdditionalInput && (


                  <FileInput
                    Seleccione sus imagenes
                    label="Seleccionar más imágenes"
                    multiple
                    accept="image/*"
                    onChange={async (files) => {
                      const arr = files?.map(async (file) => {
                        const p = new Promise((resolve, reject) => {
                          const fileReader = new FileReader();
                          fileReader.onload = (e) => {
                            resolve(e.target.result.split(',')[1]);
                          }
                          fileReader.readAsDataURL(file);
                        });
                        return p;
                      }, []);        
                      
                      const vls = await Promise.allSettled(arr);
                      setUploadedImages(vls?.map((v) => v?.value, []));
                    }}
                  />
                )}
                {uploadedImages.length > 0 && (

                  <Button
                    onClick={() => {
                      setOpenedUploaded(true);
                      // setUploadedImages([]);
                    }}
                  >
                    {'Ver imagenes cargadas'}
                  </Button>
                    
                )}
                {uploadedImages.length > 0 && (
                  <Button
                    onClick={() => {
                      handleOpenImageEditModal();
                    }}
                  >
                    {'Imagenes Seleccionadas para editar '}
                  </Button>
                )}
                 <Button 
                onClick={() => {
                handleConfirm();
                handleClick();
                notifications.show({
                  title: 'Design modificado',
                  message: 'Design modificado con exito',
                })
                }}>Modificar Design</Button>

              </FormProvider>
              <Modal opened={opened} onClose={handleCancelModal} size={'100%'}>
                <Modal.Header>Galería de Imágenes</Modal.Header>
                <Modal.Body>
                  <Group>
                    {design.Images && design.Images.map((image, index) => (
                      <Stack key={index}>
                        <Checkbox
                          onChange={() => handleImageSelection(image?.id)}
                          label={image.name || `Imagen ${index + 1}`} // Display image name if available, otherwise use a generic label
                        />
                        <Image
                          w={200}
                          src={`data:image/png;base64,${image.base64}`}
                          alt="Imagen de ejemplo"
                          style={{ marginLeft: 10 }} // Add a margin for better layout
                        />
                      </Stack>
                    ))}
                    <Button onClick={handleConfirm}>Confirmar</Button>
                    <Button onClick={handleCancelModal}>Cancelar</Button>

                  </Group>
                </Modal.Body>
              </Modal>
              <Modal
               opened={openedUploaded}
                onClose={() => setOpenedUploaded(false)}
                size={'60%'}
              >
                <Modal.Header> Imagenes Cargadas </Modal.Header>
                <Modal.Body>
                  <Group>
                  {uploadedImages && uploadedImages.map((value) => (
                    <Stack >
                    <Image
                          w={200}
                          src={`data:image/png;base64,${value}`}
                          alt="Imagen de ejemplo"
                          style={{ marginLeft: 10 }} // Add a margin for better layout
                        />
                    </Stack>
                    ))}
                  </Group>
                </Modal.Body>
              </Modal>
              <Modal opened={openedImageEditModal} onClose={handleCloseImageEditModal} size={'60%'}>
               <Modal.Header>Imágenes Seleccionadas para Editar</Modal.Header>
               <Modal.Body>
              <Group>
              {selectedImageData.map((imageData, index) => (
              <Stack key={index}>
                <Image
                  w={200}
                  src={`data:image/png;base64,${imageData.base64}`}
                  alt="Imagen de ejemplo"
                  style={{ marginLeft: 10 }}
                />
                
              </Stack>
            ))}
            </Group>
            </Modal.Body>
            </Modal>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  )
}