import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getBlogById } from '../services/Blog';
import { putBlog} from '../services/Blog';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

// Nuevo componente para el formulario
export function BlogPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

 

  const onSubmit = async (data) => {
   
    try {
      // Construye el objeto con los datos a enviar
      const blogData = {
        title: data?.title,
        description: data?.description,
        content: data?.content,
        date : formattedDate,
      };
      const response = await putBlog(blogData, id);
      console.log(blogData);
      console.log('Post modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el post:', error);
      // Manejar el error
    }
  };
  
  const [blogData, setBlogData] = useState(null);
  const formattedDate = format(blogData?.date ? new Date(blogData?.date) : new Date(), 'dd/MM/yyyy');

  useEffect(() => {
    

    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        console.log('Response:', response);
        setBlogData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching post:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchBlog();

  }, []);

  

   useEffect(() => {
     if (blogData) {
      
        setValue("title", blogData?.title);
        setValue("description", blogData?.description);
        setValue("content", blogData?.content);
        setValue("date", formattedDate);
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
         title: blogData?.title,
         description: blogData?.description,
         content: blogData?.content,
         date: formattedDate,
       });
     }
  }, [blogData]); 



  console.log(blogData, 'blogData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Title:
      <Input {...register("title")} defaultValue={blogData?.title}/>
      <br />
      <br />
      Description:
      <Input {...register("description")} defaultValue={blogData?.description}/>
      <br />
      <br />
      Content:
      <Input {...register("content")} defaultValue={blogData?.content}/>
      <br />
      <br />

      Date:
      <Input {...register("date")} defaultValue={formattedDate}/>
      <br />
      <br />
      
      <Center><Button type="submit">Modificar Post</Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}