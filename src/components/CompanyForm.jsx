import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { postCompany} from "../services/Company"
import { Input, Button ,Center, Select } from "@mantine/core"

export  function CompanyForm() {
  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const companyData = {
          name: data?.name,
          description: data?.description
        };
        const response = await postCompany(companyData);
        console.log('Empresa creada:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando la empresa:', error);
        // Manejar el error
      } 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Nombre de la Empresa:
      <Input {...register("name")} />
      <br />
      <br />
      Descripion de la Empresa:
      <Input {...register("description")} />
      <br />
      <br />

      <Center><Button type="submit">Crear Perfil</Button></Center>
    </form>
  )
}