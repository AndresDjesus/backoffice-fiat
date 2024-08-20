import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getCompanyById } from '../services/Company';
import { putCompany} from '../services/Company';
import { useParams } from 'react-router-dom';

// Nuevo componente para el formulario
export function CompanyPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const companyData = {
        name: data?.name,
        description: data?.description,
      };
      const response = await putCompany(companyData, id);
      console.log(companyData);
      console.log('Company modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando la company:', error);
      // Manejar el error
    }
  };
  
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    

    const fetchCompany = async () => {
      try {
        const response = await getCompanyById(id);
        console.log('Response:', response);
        setCompanyData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching company:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchCompany();

  }, []);

   useEffect(() => {
     if (companyData) {
      
        setValue("name", companyData?.name);
  //     // setValue("year", vehicleData?.year);
  //     // setValue("price", vehicleData?.price);
        setValue("description", companyData?.description);
  //     // setValue("transmission", vehicleData?.transmission);
  //     // setValue("screen", vehicleData?.screen);
  //     // setValue("category_id", vehicleData?.category_id);
  //     // setValue("combustible_id", vehicleData?.combustible_id);
  //     // setValue("motor_id", vehicleData?.motor_id);
  //     // setValue("inside_id", vehicleData?.inside_id);
  //     // setValue("design_id", vehicleData?.design_id);
  //     // setValue("technology_id", vehicleData?.technology_id);
       reset({
         name: companyData?.name,
         description: companyData?.description,
       });
     }
  }, [companyData]); 



  console.log(companyData, 'companyData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Nombre de la Empresa:
      <Input {...register("name")} defaultValue={companyData?.name}/>
      <br />
      <br />
      Descripcion :
      <Input {...register("description")} defaultValue={companyData?.description}/>
      <br />
      <br />
      <Center><Button type="submit">Modificar Empresa</Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}