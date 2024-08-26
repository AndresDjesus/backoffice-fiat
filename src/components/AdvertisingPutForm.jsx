import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getAdvertisingById } from '../services/Advertising';
import { putAdvertising} from '../services/Advertising';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

// Nuevo componente para el formulario
export function AdvertisingPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

 

  const onSubmit = async (data) => {
   
    try {
      // Construye el objeto con los datos a enviar
      const advertisingData = {
        name: data?.name,
      };
      const response = await putAdvertising(advertisingData, id);
      console.log(advertisingData);
      console.log('Publicidad modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el post:', error);
      // Manejar el error
    }
  };
  
  const [advertisingData, setAdvertisingData] = useState(null);

  useEffect(() => {
    

    const fetchAdvertising = async () => {
      try {
        const response = await getAdvertisingById(id);
        console.log('Response:', response);
        setAdvertisingData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching advertising:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchAdvertising();

  }, []);

   useEffect(() => {
     if (advertisingData) {
      
        setValue("name", advertisingData?.name);
        
       reset({
         name: advertisingData?.name,
       });
     }
  }, [advertisingData]); 



  console.log(advertisingData, 'advertisingData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Nombre:
      <Input {...register("name")} defaultValue={advertisingData?.name}/>
      <br />
      <br />
      <Center><Button type="submit">Modificar Publicidad</Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}