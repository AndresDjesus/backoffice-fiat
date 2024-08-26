import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getIndexById } from '../services/Index';
import { putIndex} from '../services/Index';
import { useParams } from 'react-router-dom';

// Nuevo componente para el formulario
export function IndexPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const indexData = {
        title: data?.title,
        content: data?.content,
        buyVehicletitle: data?.buyVehicletitle,
        buyVehiclecontent: data?.buyVehiclecontent,
        WhiWe : data?.WhiWe,
        LookingforVehicle : data?.LookingforVehicle
      };
      const response = await putIndex(indexData, id);
      console.log(indexData);
      console.log('Index modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el Index:', error);
      // Manejar el error
    }
  };
  
  const [indexData, setIndexData] = useState(null);

  useEffect(() => {
    

    const fetchIndex = async () => {
      try {
        const response = await getIndexById(id);
        console.log('Response:', response);
        setIndexData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching Index:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchIndex();

  }, []);

   useEffect(() => {
     if (indexData) {
      
        setValue("title", indexData?.title);
        setValue("content", indexData?.content);
        setValue ("buyVehicletitle", indexData?.buyVehiclecontent);
        setValue("buyVehiclecontent", indexData?.buyVehiclecontent);
        setValue("WhiWe" , indexData?.WhiWe);
        setValue("LookingforVehicle" , indexData?.LookingforVehicle)

       reset({
         title: indexData?.title,
         content: indexData?.content,
         buyVehicletitle: indexData?.buyVehicletitle,
         buyVehiclecontent: indexData?.buyVehiclecontent,
         WhiWe: indexData?.WhiWe,
        LookingforVehicle: indexData?.LookingforVehicle,
       });
     }
  }, [indexData]); 



  console.log(indexData, 'indexData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Title:
      <Input {...register("title")} defaultValue={indexData?.title}/>
      <br />
      <br />
      Contenido:
      <Input {...register("content")} defaultValue={indexData?.content} />
      <br />
      <br />
    Apartado Buy Vehicle Title:
      <Input {...register("buyVehicletitle")} defaultValue={indexData?.buyVehicletitle} />
      <br />
      <br />
      Apartado Buy Vehicle Content:
      <Input {...register("buyVehiclecontent")} defaultValue={indexData?.buyVehiclecontent} />
      <br />
      <br />
      Apartado Por que Nosotros:
      <Input {...register("WhiWe")} defaultValue={indexData?.WhiWe}/>
      <br />
      <br />
       Apartado Buscando Vehiculos:
      <Input {...register("LookingforVehicle")} defaultValue={indexData?.LookingforVehicle}/>
      <br />
      <br />
      <Button type="submit">Modificar Pagina Principal</Button>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}