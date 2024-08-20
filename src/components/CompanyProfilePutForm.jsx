
import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getCompanyProfileById, putCompanyProfile } from '../services/CompanyProfile';
import { getCompanys} from '../services/Company';
import { useParams } from 'react-router-dom';
import { click } from "@testing-library/user-event/dist/click";

// Nuevo componente para el formulario
export function CompanyProfilePutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const companyProfileData = {
        active: data?.active,
        mission : data?.mission,
        vision: data?.vision,
        history: data?.history,
        schedule: data?.schedule,
        company_id: Number(data?.company_id)
      };
      const response = await putCompanyProfile(companyProfileData, id);
      console.log(companyProfileData);
      console.log('Perfil modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el Perfil:', error);
      // Manejar el error
    }
  };
  
  const [companyProfileData, setCompanyProfileData] = useState(null);
  const [company, setCompany] = useState([]);

  useEffect(() => {

    const fetchCompanyProfile = async () => {
      try {
        const response = await getCompanyProfileById(id);
        console.log('Response:', response);
        setCompanyProfileData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching company profile:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    const fetchCompany = async () => {
      try {
        const response = await getCompanys();
        console.log('Response:', response);
        setCompany(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching company:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchCompany();

    fetchCompanyProfile();

  }, []);

   useEffect(() => {
     if (companyProfileData) {
      
        setValue("active", companyProfileData?.active);
        setValue("mission", companyProfileData?.mission);
        setValue("vision", companyProfileData?.vision);
        setValue("history", companyProfileData?.history);
        setValue("schedule", companyProfileData?.schedule);
        setValue("company_id", companyProfileData?.company_id);
       reset({
         active: companyProfileData?.active,
         mission: companyProfileData?.mission,
         vision: companyProfileData?.vision,
         history: companyProfileData?.history,
         schedule: companyProfileData?.schedule,
         company_id: companyProfileData?.company?.id?.toString(), 
       });
     }
  }, [companyProfileData]); 

  console.log(companyProfileData, 'companyProfileData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Estado del perfil:
      <Input {...register("active")} defaultValue={companyProfileData?.active}/>
      <br />
      <br />
      Mision de la Empresa:
      <Input {...register("mission")} defaultValue={companyProfileData?.mission}/>
      <br />
      <br />
      Vision de la Empresa:
      <Input {...register("vision")} defaultValue={companyProfileData?.vision}/>
      <br />
      <br />
      Historia de la Empresa:
      <Input {...register("history")} defaultValue={companyProfileData?.history}/>
      <br />
      <br />
      Horario de trabajo de la Empresa:
      <Input {...register("schedule")} defaultValue={companyProfileData?.schedule}/>
      <br />
      <br />

      <Select
        label="Nombre de la Empresa"
        data={company?.map((company) => { 
          return {value: company?.id?.toString(), label: company?.name }
        })
      }
        onChange={(e) => {
          console.log(e)
          setValue("company_id", e)
        }}
      />
      <br />
      <br />
      
      <Center><Button type="submit">Modificar Combustible </Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}