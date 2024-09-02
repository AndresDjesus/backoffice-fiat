import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getCombustibleById } from '../services/Combustible';
import { putCombustible} from '../services/Combustible';
import { useParams } from 'react-router-dom';
import { click } from "@testing-library/user-event/dist/click";
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';

// Nuevo componente para el formulario
export function CombustiblePutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const combustibleData = {
        name: data?.name,
        carretera : data?.carretera,
        ciudad: data?.ciudad,
        description: data?.description,
      };
      const response = await putCombustible(combustibleData, id);
      console.log(combustibleData);
      console.log('Combustible modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el combustible:', error);
      // Manejar el error
    }
  };
  
  const [combustibleData, setCombustibleData] = useState(null);

  useEffect(() => {

    const fetchCombustible = async () => {
      try {
        const response = await getCombustibleById(id);
        console.log('Response:', response);
        setCombustibleData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching Combustible:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchCombustible();

  }, []);

   useEffect(() => {
     if (combustibleData) {
      
        setValue("name", combustibleData?.name);
        setValue("ciudad", combustibleData?.ciudad);
        setValue("carretera", combustibleData?.carretera);
        setValue("description", combustibleData?.description);
       reset({
         name: combustibleData?.name,
         ciudad : combustibleData?.ciudad,
         carretera: combustibleData?.carretera,
         description: combustibleData?.description   
       });
     }
  }, [combustibleData]); 

  console.log(combustibleData, 'combustibleData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Nombre del combustible:
      <Input {...register("name")} defaultValue={combustibleData?.name}/>
      <br />
      <br />
     Rendimiento de combustible en Ciudad:
      <Input {...register("ciudad")} defaultValue={combustibleData?.ciudad}/>
      <br />
      <br />
      Rendimiento de combustible en Carretera:
      <Input {...register("carretera")} defaultValue={combustibleData?.carretera}/>
      <br />
      <br />
      Descripcion del combustible:
      <Input {...register("description")} defaultValue={combustibleData?.description}/>
      <br />
      <br />
      
      <Center><Button type="submit" onClick={() => {
                notifications.show({
                  title: 'Combustible modificado',
                  message: 'Combustible modificada con exito',
                })
                }}>Modificar Combustible </Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}