import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { postCompanyProfile} from "../services/CompanyProfile"
import { Input, Button ,Center, Select } from "@mantine/core"
import { getCompanys} from "../services/Company"
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

export  function CompanyProfileForm() {

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const companyProfileData = {
          company_id: Number (data?.company_id),
          active: data?.active,
          mission: data?.mission,
          vision: data?.vision,
          history: data?.history,
          schedule: data?.schedule
        };
        const response = await postCompanyProfile(companyProfileData);
        notifications.show({
          title: 'Exito',
          message: 'Perfil Creado exitosamente',
          color: 'green',
        });
          navigate('/listCompanyProfile');
            console.log(data?.base64, 'RESULTADO DATA BASE 64');
          console.log('Perfil creado:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando el Perfil:', error);
        // Manejar el error
      } 
  };

  const [company, setCompany] = useState([]);
  useEffect(() => {
    const fetchCompany = async () => {
      const data = await getCompanys();
      setCompany(data || []);
    };
    fetchCompany();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Estado del perfil:
      <Input {...register("active")} />
      <br />
      <br />
      Mision de la Empresa:
      <Input {...register("mission")} />
      <br />
      <br />
      Vision de la Empresa:
      <Input {...register("vision")} />
      <br />
      <br />
      Historia de la Empresa:
      <Input {...register("history")} />
      <br />
      <br />
      Horario de trabajo de la Empresa:
      <Input {...register("schedule")} />
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

      <Center><Button type="submit">Crear Perfil</Button></Center>
    </form>
  )
}