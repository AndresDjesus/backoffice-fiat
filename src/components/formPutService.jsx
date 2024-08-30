import { Box, Grid, Input, Stack, Group, Button, Image, Checkbox, FileInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getServiceById , putService} from '../services/Service';
import { Modal } from '@mantine/core';
import { getImageById } from '../services/Images';
import { putImage } from "../services/Images";

export const FormPutService = () => {

  const form = useForm();
  const { id } = useParams();

  const [service, setService] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]); // IDs of selected images
  const [selectedImageData, setSelectedImageData] = useState([]); // Data for selected images
  const [uploadedImages, setUploadedImages] = useState([]);  // Base64 of uploaded images
  const [opened, setOpened,] = useState(false);
  const [openedUploaded, setOpenedUploaded] = useState(false);
  const [openedImageEditModal, setOpenedImageEditModal] = useState(false);
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);


  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await getServiceById(id);
        setService(response);
      } catch (error) {
        console.error('Error al obtener el servicio:', error);
      }
    };

    fetchService();
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
      const updatedServiceData = {
        name: form.getValues('name'),
        description: form.getValues('description'),
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
      const putServicePromise = putService( updatedServiceData , id);
      putPromises.push(putServicePromise);
  
      // Ejecutar todas las promesas en paralelo
      Promise.all(putPromises)
        .then(() => {
          console.log('Imágenes y servicio modificados exitosamente');
        })
        .catch((error) => {
          console.error('Error al modificar las imágenes o el servicio:', error);
        });
    } else {
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
              {'Modificar  Servicio'}
            </h2>
            <Group>
              <FormProvider {...form}>
                <Input.Wrapper
                  label="Nombre de la publicidad"
                >
                  <Input
                    {...form.register('name')}
                    defaultValue={service?.name}
                    placeholder="Nombre del Servicio"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Descripción del Servicio"
                >
                  <Input
                    {...form.register('description')}
                    defaultValue={service?.description}
                    placeholder="Descripción del Servicio"
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
                <Button onClick={() => handleConfirm()}>Modificar Servicio</Button>

              </FormProvider>
              <Modal opened={opened} onClose={handleCancelModal} size={'100%'}>
                <Modal.Header>Galería de Imágenes</Modal.Header>
                <Modal.Body>
                  <Group>
                    {service.Images && service.Images.map((image, index) => (
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