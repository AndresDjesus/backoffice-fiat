import { Box, Grid, Input, Stack, Group, Button, Image, Checkbox, FileInput, Title, Text, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { FormProvider, get, useForm } from "react-hook-form";
import { setValue } from 'react-hook-form';
import { useParams } from "react-router-dom";
import { getVehicleById } from '../services/Vehicles';
import { putVehicles } from '../services/Vehicles';
import { getCombustible } from '../services/Combustible';
import { getCategory } from '../services/Category';
import { getMotors } from '../services/Motors';
import { getInsides } from '../services/Inside';
import { getDesigns } from '../services/Design';
import { getTechnology } from '../services/Technology';
import { Modal } from '@mantine/core';
import { getImageById } from '../services/Images';
import { putImage } from "../services/Images";
import { useNavigate } from "react-router-dom";
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';

export const FormPutVehicles = () => {

  const form = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]); // IDs of selected images
  const [selectedImageData, setSelectedImageData] = useState([]); // Data for selected images
  const [uploadedImages, setUploadedImages] = useState([]);  // Base64 of uploaded images
  const [opened, setOpened,] = useState(false);
  const [openedUploaded, setOpenedUploaded] = useState(false);
  const [openedImageEditModal, setOpenedImageEditModal] = useState(false);
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [combustible, setCombustible] = useState([]);
  const [category, setCategory] = useState([]);
  const [motors, setMotors] = useState([]);
  const [insides, setInsides] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [technology, setTechnologies] = useState([]);
  const [combustibleId, setCombustibleId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [motorId, setMotorId] = useState('');
  const [insideId, setInsideId] = useState('');
  const [designId, setDesignId] = useState('');
  const [technologyId, setTechnologyId] = useState('');
  const [transmission, setTransmission] = useState(['automatic', 'manual']);

  const { register, handleSubmit, getValues, setValue, reset } = useForm();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await getVehicleById(id);
        setVehicle(response);
      } catch (error) {
        console.error('Error al obtener el vehiculo:', error);
      }
    };

    const fetchCombustible = async () => {
      const response = await getCombustible();
      setCombustible(response);
    };
    const fetchCategory = async () => {
      const response = await getCategory();
      setCategory(response);
    };

    const fetchMotors = async () => {
      const response = await getMotors();
      setMotors(response);
    };
    const fetchInsides = async () => {
      const response = await getInsides();
      setInsides(response);
    };
    const fetchDesigns = async () => {
      const response = await getDesigns();
      setDesigns(response);
    };
    const fetchTechnology = async () => {
      const response = await getTechnology();
      setTechnologies(response);
    };

    fetchCombustible();
    fetchCategory();
    fetchMotors();
    fetchInsides();
    fetchDesigns();
    fetchTechnology();
    fetchVehicle();

  }, [id]);

  // console.log(getValues('technology_id'));

  useEffect(() => {
    reset({
      category_id: vehicle?.category?.id?.toString(),
      motor_id: vehicle?.motor?.id?.toString(),
      inside_id: vehicle?.inside?.id?.toString(),
      design_id: vehicle?.design?.id?.toString(),
      technology_id: vehicle?.technology?.id?.toString(),
      combustible_id: vehicle?.combustible?.id?.toString(),
      name: vehicle?.name,
      year: vehicle?.year,
      price: vehicle?.price,
      description: vehicle?.description,
    });

    setTechnologyId(vehicle?.technology?.id?.toString());
    setCombustibleId(vehicle?.combustible?.id?.toString());
    setMotorId(vehicle?.motor?.id?.toString());
    setInsideId(vehicle?.inside?.id?.toString());
    setDesignId(vehicle?.design?.id?.toString());
    setCategoryId(vehicle?.category?.id?.toString());
    setTransmission(vehicle?.transmission || 'automatic, manual');

  }, [vehicle])

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
      const updatedVehicleData = {
        name: form.getValues('name') ? form.getValues('name') : vehicle?.name,
        year: form.getValues('year') ? form.getValues('year') : vehicle?.year,
        price: form.getValues('price') ? form.getValues('price') : vehicle?.price,
        description: form.getValues('description') ? form.getValues('description') : vehicle?.description,
        transmission: transmission,
        screen: form.getValues('screen') ? form.getValues('screen') : vehicle?.screen,
        category_id: categoryId,
        combustible_id: combustibleId,
        motor_id: motorId,
        inside_id: insideId,
        design_id: designId,
        technology_id: technologyId,

        // ... otros campos que quieras actualizar
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
      console.log(updatedVehicleData, 'DATOOOOS');
      // Crear la solicitud PUT para actualizar la publicidad
      const putVehiclePromise = putVehicles(updatedVehicleData, id);
      putPromises.push(putVehiclePromise);

      // Ejecutar todas las promesas en paralelo
      Promise.all(putPromises)
        .then((r) => {
          const [ imageR1, imageR2 ] = r;
          if(!imageR1?.stack && !imageR2?.stack) {
            notifications.show({
              title: 'Vehiculo modificado',
              message: 'Vehiculo modificado exitosamente',
              color: 'green',
            });
            navigate('/listVehicles');
          }
        }        
        )
        .catch((error) => {
          console.error('Error al modificar las imágenes o el vehiculo:', error);
        });
    } else {

        // Datos actualizados de la publicidad (obtienes estos datos de tu formulario)
        const updatedVehicleData = {
          name: form.getValues('name') ? form.getValues('name') : vehicle?.name,
          year: form.getValues('year') ? form.getValues('year') : vehicle?.year,
          price: form.getValues('price') ? form.getValues('price') : vehicle?.price,
          description: form.getValues('description') ? form.getValues('description') : vehicle?.description,
          transmission: transmission,
          screen: form.getValues('screen') ? form.getValues('screen') : vehicle?.screen,
          category_id: categoryId,
          combustible_id: combustibleId,
          motor_id: motorId,
          inside_id: insideId,
          design_id: designId,
          technology_id: technologyId,

        }

        const putVehiclePromise = putVehicles(updatedVehicleData, id);
        putVehiclePromise.then((response) => {
          if(response.stack) {
            notifications.show({
              title: 'Error',
              message: `${response?.message}`,
              color: 'red',
            })
          } else {
            notifications.show({
              title: 'Vehiculo modificado',
              message: 'Vehiculo modificado exitosamente',
              color: 'green',
            });
            navigate('/listVehicles');
          }
        })
        .catch((error) => {
          console.error('Error al modificar el vehiculo:', error);
        });
    }
  };

  return (
    <Box>
      <Grid>
        <Grid.Col p={'10rem'}>
          <Stack>
            <h2>
              {'Modificar Vehiculo'}
            </h2>
            <Group>
              <FormProvider {...form}>
                <Input.Wrapper
                  label="Name"
                >
                  <Input
                    {...form.register('name')}
                    defaultValue={vehicle.name}
                    placeholder="Address"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Year"
                >
                  <Input
                    {...form.register('year')}
                    defaultValue={vehicle.year}
                    placeholder="Year"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Price"
                >
                  <Input
                    {...form.register('price')}
                    defaultValue={vehicle.price}
                    placeholder="Price"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label="Description"
                >
                  <Input
                    {...form.register('description')}
                    defaultValue={vehicle.description}
                    placeholder="Description"
                  />
                </Input.Wrapper>

                <Input.Wrapper
                >
               <Select
                  label="Transmision"
                  data={["manual", "automatic"]}
                  value={transmission} 
                  onChange={(e) => {
                  setTransmission(e);
                  setValue("transmission", e)
                  }}
                />
                </Input.Wrapper>

                <Input.Wrapper
                  label="Pantalla"
                >
                  <Input
                    {...form.register('screen')}
                    defaultValue={vehicle.screen}
                    placeholder="Pantalla"
                  />
                </Input.Wrapper>
                <Input.Wrapper
                >
                  <Select
                    label="Categoria"
                    name="category_id"
                    value={categoryId}
                    data={category?.map((c) => {
                      return { value: c?.id?.toString(), label: c?.name }
                    }
                      , [])
                    }
                    onChange={(e) => {
                      setCategoryId(e);
                      setValue("category_id", e)
                    }}
                  />
                </Input.Wrapper>
                <Input.Wrapper>
                  <Select
                    label="Combustible"
                    name="combustible_id"
                    value={combustibleId}
                    data={
                      combustible?.map((combustible) => {
                        return { value: combustible?.id?.toString(), label: combustible?.name }
                      })
                    }
                    onChange={(e) => {
                      setCombustibleId(e);
                      setValue('combustible_id', e);
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper>
                  <Select
                    label="Motor"
                    name="motor_id"
                    value={motorId}
                    data={
                      motors?.map((motors) => {
                        return { value: motors?.id?.toString(), label: motors?.name }
                      })
                    }
                    onChange={(e) => {
                      setMotorId(e);
                      setValue('motor_id', e);
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper>
                  <Select
                    label="Interior"
                    name="inside_id"
                    value={insideId}
                    data={
                      insides?.map((insides) => {
                        return { value: insides?.id?.toString(), label: insides?.content }
                      })
                    }
                    onChange={(e) => {
                      setInsideId(e);
                      setValue('inside_id', e);
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper>
                <Select
                    label="Diseno"
                    name="design_id"
                    value={designId}
                    data={
                      designs?.map((design) => {
                        return { value: design?.id?.toString(), label: design?.title }
                      })
                    }
                    onChange={(e) => {
                      setDesignId(e);
                      setValue('design_id', e);
                    }}

                  />
                </Input.Wrapper>

                <Input.Wrapper>
                  <Select
                    label="Tecnologia"
                    name="technology_id"
                    value={technologyId}
                    data={
                      technology?.map((technology) => {
                        return { value: technology?.id?.toString(), label: technology?.title }
                      })
                    }
                    onChange={(e) => {
                      setTechnologyId(e);
                      setValue('technology_id', e);
                    }}

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
                }}>Modificar Vehiculo</Button>

              </FormProvider>
              <Modal opened={opened} onClose={handleCancelModal} size={'100%'}>
                <Modal.Header>Galería de Imágenes</Modal.Header>
                <Modal.Body>
                  <Group>
                    {vehicle.Images && vehicle.Images.map((image, index) => (
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