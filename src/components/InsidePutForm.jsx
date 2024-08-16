import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getInsideById } from '../services/Inside';
import { putInside} from '../services/Inside';
import { useParams } from 'react-router-dom';

// Nuevo componente para el formulario
export function InsidePutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const insideData = {
        title: data?.title,
        content : data?.content,
      };
      const response = await putInside(insideData, id);
      console.log(insideData);
      console.log('Interior modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el interior:', error);
      // Manejar el error
    }
  };
  
  const [insideData, setInsideData] = useState(null);

  useEffect(() => {
    

    const fetchInside = async () => {
      try {
        const response = await getInsideById(id);
        console.log('Response:', response);
        setInsideData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching inside:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchInside();

  }, []);

   useEffect(() => {
     if (insideData) {
      
        setValue("title", insideData?.title);
        setValue("content", insideData?.content);
  //     // setValue("price", vehicleData?.price);
  //     // setValue("description", vehicleData?.description);
  //     // setValue("transmission", vehicleData?.transmission);
  //     // setValue("screen", vehicleData?.screen);
  //     // setValue("category_id", vehicleData?.category_id);
  //     // setValue("combustible_id", vehicleData?.combustible_id);
  //     // setValue("motor_id", vehicleData?.motor_id);
  //     // setValue("inside_id", vehicleData?.inside_id);
  //     // setValue("design_id", vehicleData?.design_id);
  //     // setValue("technology_id", vehicleData?.technology_id);
       reset({
         title: insideData?.title,
         content: insideData?.content,
       });
     }
  }, [insideData]); 



  console.log(insideData, 'insideData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Title:
      <Input {...register("title")} defaultValue={insideData?.title}/>
      <br />
      <br />

      Content:
      <Input {...register("content")} defaultValue={insideData?.content}/>
      <br />
      <br />
      
      <Center><Button type="submit">Modificar Interior</Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}