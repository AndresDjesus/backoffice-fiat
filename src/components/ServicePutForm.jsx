import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getServiceById } from '../services/Service';
import { putService} from '../services/Service';
import { useParams } from 'react-router-dom';

// Nuevo componente para el formulario
export function ServicePutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const serviceData = {
        name: data?.name,
        description : data?.decription,
      };
      const response = await putService(serviceData, id);
      console.log(serviceData);
      console.log('Servicio modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el servicio:', error);
      // Manejar el error
    }
  };
  
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    

    const fetchService = async () => {
      try {
        const response = await getServiceById(id);
        console.log('Response:', response);
        setServiceData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching service:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchService();

  }, []);

   useEffect(() => {
     if (serviceData) {
      
        setValue("name", serviceData?.name);
        setValue("description", serviceData?.description);
       reset({
         name: serviceData?.name,
         description: serviceData?.description,
       });
     }
  }, [serviceData]); 

  console.log(serviceData, 'serviceData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Nombre:
      <Input {...register("name")} defaultValue={serviceData?.name}/>
      <br />
      <br />

      Descripcion:
      <Input {...register("description")} defaultValue={serviceData?.description}/>
      <br />
      <br />
      
      <Center><Button type="submit">Modificar Servicio </Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}