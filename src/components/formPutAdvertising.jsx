import { Box, Grid, Input, Stack, Group, Button, Image, Checkbox, FileInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { getAdvertisingById } from '../services/Advertising';
import { Modal } from '@mantine/core';
import { getImageById } from '../services/Images';

export const FormPutAdvertising = () => {

  const form = useForm();
  const { id } = useParams();

  const [advertising, setAdvertising] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [opened, setOpened,] = useState(false);
  const [openedUploaded, setOpenedUploaded] = useState(false);
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [ images , setImages] = useState([]);

  useEffect(() => {
    const fetchAdvertising = async () => {
      try {
        const response = await getAdvertisingById(id);
        setAdvertising(response);
      } catch (error) {
        console.error('Error al obtener la publicidad:', error);
      }
    };

    fetchAdvertising();
  }, [id]);

  const handleImageSelection = (imageId) => {
    const newSelectedImages = [...selectedImages]; // Create a copy to avoid mutation
    if (newSelectedImages.includes(imageId)) {
      // Remove from selection if already checked
      const indexToRemove = newSelectedImages.indexOf(imageId);
      newSelectedImages.splice(indexToRemove, 1);
    } else {
      // Add to selection if not checked
      newSelectedImages.push(imageId);
    }
    setSelectedImages(newSelectedImages);
  };

  const handleCancelModal = () => {
    // Clear selected images when the modal is closed using the cancel button
    setSelectedImages([]);
    setOpened(false);
  };

  const handleConfirm = () => {
    if (selectedImages.length > 0) {
      setShowAdditionalInput(true);
      setOpened(false);
      // Aquí puedes realizar la lógica para enviar las imágenes seleccionadas al servidor o realizar otras acciones
    } else {
      // Mostrar un mensaje al usuario indicando que debe seleccionar al menos una imagen
    }
  };

  console.log(uploadedImages);

  return (
    <Box>
      <Grid>
        <Grid.Col p={'10rem'}>
          <Stack>
            <h2>
              {'Modificar  Publicidad'}
            </h2>
            <Group>
              <FormProvider {...form}>
                <Input.Wrapper
                  label="Nombre de la publicidad"
                >
                  <Input
                    {...form.register('name')}
                    defaultValue={advertising.name}
                    placeholder="Nombre de la publicidad"
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
              </FormProvider>
              <Modal opened={opened} onClose={handleCancelModal} size={'100%'}>
                <Modal.Header>Galería de Imágenes</Modal.Header>
                <Modal.Body>
                  <Group>
                    {advertising.Images && advertising.Images.map((image, index) => (
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
               onClose={}
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
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  )
}
