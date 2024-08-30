import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button, Text, Title, Center, Image, Input, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm, reset } from 'react-hook-form';
import { getAdvertisingById, putAdvertising } from '../services/Advertising';
import { putImage } from '../services/Images';
import { useParams } from 'react-router-dom';

// Componente para el formulario de edición de publicidad
export function AdvertisingPutForm() {
    const { id } = useParams();
    const { register, setValue, reset } = useForm();
    // No need for useNavigate here since we're not redirecting

    const [advertisingData, setAdvertisingData] = useState(null);
    const [previewImageUrls, setPreviewImageUrls] = useState([]);

    useEffect(() => {
        const fetchAdvertising = async () => {
            try {
                const response = await getAdvertisingById(id);
                setAdvertisingData(response);
                setPreviewImageUrls(response.Images.map((image) => image.base64));
            } catch (error) {
                console.error('Error al obtener la publicidad:', error);
                // Maneja el error de forma adecuada, por ejemplo, mostrando un mensaje de error al usuario
            }
        };

        fetchAdvertising();
    }, []);

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setPreviewImageUrls((prevImageUrls) => {
                const newImageUrls = [...prevImageUrls];
                newImageUrls[index] = e.target.result;
                return newImageUrls;
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (data, event) => {
      try {
        // Update main advertising data
        const response = await putAdvertising(data, id);
        console.log(response);
        // // Check for successful response (e.g., status code 200)
        // if (response.status === 200) {
        //   console.log('Publicidad modificada con éxito:', response);
  
        //   // Update images
        //   advertisingData.Images.forEach(async (image, index) => {
        //     const formData = new FormData();
        //     formData.append('image', previewImageUrls[index]);
        //     await putImage(formData, image.id);
        //   });
        // } else {
        //   console.error('Error al actualizar la publicidad:', response);
        //   // Handle the specific error from the server response
        // }
      } catch (error) {
        console.error('Error al modificar la publicidad:', error);
        // Handle general errors like network issues
      }
    };

    return (
        <Box>
            <Grid>
                <Grid.Col c={'blue'} span={{ span: 12, md: 12 }}>
                    <Center>
                        <form onSubmit={handleSubmit}>
                            Nombre de la Publicidad:
                            <br />
                            <Input
                                label="Nombre de la publicidad"
                                
                                {...register("name")}
                                defaultValue={advertisingData?.name}
                            />
                            {/* Otros campos del formulario */}
                            <br />
                            <div>
                                {advertisingData?.Images?.map((image, index) => (
                                    <div key={index}>
                                        <Image
                                            src={`data:image/jpeg;base64,${image?.base64}`}
                                            alt={`Imagen ${index + 1}`}
                                            width={300}
                                            height={200}
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageChange(e, index)}
                                        />
                                        <br />
                                        <Image
                                            src={previewImageUrls[index]}
                                            alt="Vista previa"
                                            width={300}
                                            height={200}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <Center><Button type="submit">Guardar cambios</Button> </Center>
                        </form>
                    </Center>
                </Grid.Col>
            </Grid>
        </Box>
    );
}



