import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getMotorById } from '../services/Motors';
import { putMotor} from '../services/Motors';
import { useParams } from 'react-router-dom';
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';

// Nuevo componente para el formulario
export function MotorsPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const motorData = {
        name: data?.name,
      };
      const response = await putMotor(motorData, id);
      console.log(motorData);
      console.log('Motor modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el motor:', error);
      // Manejar el error
    }
  };
  
  const [motorData, setMotorData] = useState(null);

  useEffect(() => {
    

    const fetchMotor = async () => {
      try {
        const response = await getMotorById(id);
        console.log('Response:', response);
        setMotorData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching motor:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchMotor();

  }, []);

   useEffect(() => {
     if (motorData) {
      
        setValue("name", motorData?.name);
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
         name: motorData?.name,
       });
     }
  }, [motorData]); 



  console.log(motorData, 'motorData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Name:
      <Input {...register("name")} defaultValue={motorData?.name}/>
      <br />
      <br />
      
      <Center><Button type="submit" onClick={() => {
                notifications.show({
                  title: 'Motor modificado',
                  message: 'Motor modificado con exito',
                })
                }}>Modificar Motor</Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}