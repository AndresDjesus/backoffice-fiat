import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getTechnologyById } from '../services/Technology';
import { putTechnology} from '../services/Technology';
import { useParams } from 'react-router-dom';
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';


// Nuevo componente para el formulario
export function TechnologyPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const technologyData = {
        title: data?.title,
        content : data?.content,
      };
      const response = await putTechnology(technologyData, id);
      console.log(technologyData);
      console.log('Tecnologia modificada:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando la tecnologia:', error);
      // Manejar el error
    }
  };
  
  const [technologyData, setTechnologyData] = useState(null);

  useEffect(() => {

    const fetchTechnology = async () => {
      try {
        const response = await getTechnologyById(id);
        console.log('Response:', response);
        setTechnologyData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching Technology:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchTechnology();

  }, []);

   useEffect(() => {
     if (technologyData) {
      
        setValue("title", technologyData?.title);
        setValue("content", technologyData?.content);
       reset({
         title: technologyData?.title,
         content: technologyData?.content,
       });
     }
  }, [technologyData]); 

  console.log(technologyData, 'technologyData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Title:
      <Input {...register("title")} defaultValue={technologyData?.title}/>
      <br />
      <br />

      Content:
      <Input {...register("content")} defaultValue={technologyData?.content}/>
      <br />
      <br />
      
      <Center><Button type="submit" onClick={() => {
                notifications.show({
                  title: 'Tecnologia modificada',
                  message: 'Tecnologia modificada con exito',
                })
                }}>Modificar Tecnologia </Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}