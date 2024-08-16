import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getCategoryById } from '../services/Category';
import { putCategory} from '../services/Category';
import { useParams } from 'react-router-dom';

// Nuevo componente para el formulario
export function CategoryPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const categoryData = {
        name: data?.name,
      };
      const response = await putCategory(categoryData, id);
      console.log(categoryData);
      console.log('Categoria modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando la categoria:', error);
      // Manejar el error
    }
  };
  
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    

    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(id);
        console.log('Response:', response);
        setCategoryData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching category:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchCategory();

  }, []);

   useEffect(() => {
     if (categoryData) {
      
  //     // setValue("name", vehicleData?.name);
  //     // setValue("year", vehicleData?.year);
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
         name: categoryData?.name,
       });
     }
  }, [categoryData]); 



  console.log(categoryData, 'categoryData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Name:
      <Input {...register("name")} defaultValue={categoryData?.name}/>
      <br />
      <br />
      
      <Center><Button type="submit">Modificar Categoria</Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}