import { Box, Grid, Input, Stack, Group, Button, Image, Checkbox, FileInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getFooterById , putFooter} from '../services/Footer';
import { Modal } from '@mantine/core';
import { getImageById } from '../services/Images';
import { putImage } from "../services/Images";
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";
export const FormPutFooter = () => {

  const form = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [footer, setFooter] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]); // IDs of selected images
  const [selectedImageData, setSelectedImageData] = useState([]); // Data for selected images
  const [uploadedImages, setUploadedImages] = useState([]);  // Base64 of uploaded images
  const [opened, setOpened,] = useState(false);
  const [openedUploaded, setOpenedUploaded] = useState(false);
  const [openedImageEditModal, setOpenedImageEditModal] = useState(false);
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);

  const handleClick = () => {
    navigate('/listFooter'); 
  };

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await getFooterById(id);
        setFooter(response);
      } catch (error) {
        console.error('Error al obtener el footer:', error);
      }
    };

    fetchFooter();
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
      const updatedFooterData = {
        address: form.getValues('address') ? form.getValues('address'): footer?.address,
        email: form.getValues('email') ? form.getValues('email'):footer?.email,
        phone: form.getValues('phone') ? form.getValues('phone'):footer?.phone,
        social_networks: {
          gmail :{
            username: form.getValues('social_networks?.gmail?.username') ? form.getValues('social_networks?.gmail?.username'):footer?.social_networks?.gmail?.username,
            url : form.getValues('social_networks?.gmail?.url') ? form.getValues('social_networks?.gmail?.url'):footer?.social_networks?.gmail?.url,
          },
          instagram: {
            username: form.getValues('social_networks?.instagram?.username') ? form.getValues('social_networks?.instagram?.username'):footer?.social_networks?.instagram?.username,
            url : form.getValues('social_networks?.instagram?.url') ? form.getValues('social_networks?.instagram?.url'):footer?.social_networks?.instagram?.url,
          },
          whatsapp :{
            number : form.getValues('social_networks?.whatsapp?.number') ? form.getValues('social_networks?.whatsapp?.number'):footer?.social_networks?.whatsapp?.number,
            url : form.getValues('social_networks?.whatsapp?.url') ? form.getValues('social_networks?.whatsapp?.url'):footer?.social_networks?.whatsapp?.url,
          } ,
      }
    }
  
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
      const putFooterPromise = putFooter( updatedFooterData , id);
      putPromises.push(putFooterPromise);
  
      // Ejecutar todas las promesas en paralelo
      Promise.all(putPromises)
        .then(() => {
          console.log('Imágenes y footer modificados exitosamente');
        })
        .catch((error) => {
          console.error('Error al modificar las imágenes o el footer:', error);
        });
    } else {
      const updatedFooterData = {
        address: form.getValues('address') ? form.getValues('address'): footer?.address,
        email: form.getValues('email') ? form.getValues('email'):footer?.email,
        phone: form.getValues('phone') ? form.getValues('phone'):footer?.phone,
        social_networks: {
          gmail :{
            username: form.getValues('social_networks?.gmail?.username') ? form.getValues('social_networks?.gmail?.username'):footer?.social_networks?.gmail?.username,
            url : form.getValues('social_networks?.gmail?.url') ? form.getValues('social_networks?.gmail?.url'):footer?.social_networks?.gmail?.url,
          },
          instagram: {
            username: form.getValues('social_networks?.instagram?.username') ? form.getValues('social_networks?.instagram?.username'):footer?.social_networks?.instagram?.username,
            url : form.getValues('social_networks?.instagram?.url') ? form.getValues('social_networks?.instagram?.url'):footer?.social_networks?.instagram?.url,
          },
          whatsapp :{
            number : form.getValues('social_networks?.whatsapp?.number') ? form.getValues('social_networks?.whatsapp?.number'):footer?.social_networks?.whatsapp?.number,
            url : form.getValues('social_networks?.whatsapp?.url') ? form.getValues('social_networks?.whatsapp?.url'):footer?.social_networks?.whatsapp?.url,
          } ,
      }
    }

      const putFooterPromise = putFooter( updatedFooterData , id);
      
      putFooterPromise
        .then((response) => {
          console.log('Imágenes y footer modificados exitosamente');
          if(response?.stack) {
            notifications.show({
              title: 'Error',
              message: response?.message,
              color: 'red',
            });
          } else {
            notifications.show({
              title: 'Exito',
              message: 'Footer modificado exitosamente',
              color: 'green',
            });
            handleClick();
          }
        })
        .catch((error) => {
          console.error('Error al modificar las imágenes o el servicio:', error);
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
              {'Modificar Pie de Pagina'}
            </h2>
            <Group>
              <FormProvider {...form}>
                <Input.Wrapper
                  label="Address"
                >
                  <Input
                    {...form.register('address')}
                    defaultValue={footer.address}
                    placeholder="Address"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Email"
                >
                  <Input
                    {...form.register('email')}
                    defaultValue={footer.email}
                    placeholder="Email"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Phone"
                >
                  <Input
                    {...form.register('phone')}
                    defaultValue={footer.phone}
                    placeholder="Phone"
                  />
                </Input.Wrapper>

                <Input.Wrapper
                  label="Gmail"
                >
                  <Input
                    {...form.register('social_networks?.gmail?.username')}
                    defaultValue={footer.social_networks?.gmail?.username}
                    placeholder="Gmail"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Gmail Url"
                >
                  <Input
                    {...form.register('social_networks?.gmail?.url')}
                    defaultValue={footer.social_networks?.gmail?.url}
                    placeholder="Gmail Url"
                  />
                </Input.Wrapper>

                <Input.Wrapper
                  label="Instagram"
                >
                  <Input
                    {...form.register('social_networks?.instagram?.username')}
                    defaultValue={footer.social_networks?.instagram?.username}
                    placeholder="Instagram"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Instagram Url"
                >
                  <Input
                    {...form.register('social_networks?.instagram?.url')}
                    defaultValue={footer.social_networks?.instagram?.url}
                    placeholder="Instagram Url"
                  />
                </Input.Wrapper>

                <Input.Wrapper
                  label="Whatsapp"
                >
                  <Input
                    {...form.register('social_networks?.whatsapp?.number')}
                    defaultValue={footer.social_networks?.whatsapp?.number}
                    placeholder="Whatsapp"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Whatsapp Url"
                >
                  <Input
                    {...form.register('social_networks?.whatsapp?.url')}
                    defaultValue={footer.social_networks?.whatsapp?.url}
                    placeholder="Whatsapp Url"
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
                    label="Seleccionar imágenes"
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
                  title: 'Footer modificado',
                  message: 'Footer modificado con exito',
                })
                }}>Modificar Pie de Pagina</Button>

              </FormProvider>
              <Modal opened={opened} onClose={handleCancelModal} size={'100%'}>
                <Modal.Header>Galería de Imágenes</Modal.Header>
                <Modal.Body>
                  <Group>
                    {footer.Images && footer.Images.map((image, index) => (
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