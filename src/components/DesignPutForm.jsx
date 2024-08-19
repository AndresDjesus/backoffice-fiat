import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getDesignById } from '../services/Design';
import { putDesign} from '../services/Design';
import { useParams } from 'react-router-dom';

// Nuevo componente para el formulario
export function DesignPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const designData = {
        title: data?.title,
        content : data?.content,
      };
      const response = await putDesign(designData, id);
      console.log(designData);
      console.log('Design modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el design:', error);
      // Manejar el error
    }
  };
  
  const [designData, setDesignData] = useState(null);

  useEffect(() => {
    

    const fetchDesign = async () => {
      try {
        const response = await getDesignById(id);
        console.log('Response:', response);
        setDesignData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching design:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchDesign();

  }, []);

   useEffect(() => {
     if (designData) {
      
        setValue("title", designData?.title);
        setValue("content", designData?.content);
       reset({
         title: designData?.title,
         content: designData?.content,
       });
     }
  }, [designData]); 

  console.log(designData, 'designData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Title:
      <Input {...register("title")} defaultValue={designData?.title}/>
      <br />
      <br />

      Content:
      <Input {...register("content")} defaultValue={designData?.content}/>
      <br />
      <br />
      
      <Center><Button type="submit">Modificar Design </Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}