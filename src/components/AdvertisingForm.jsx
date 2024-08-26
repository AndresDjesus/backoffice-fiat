import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { postAdvertising} from "../services/Advertising"
import { Input, Button ,Center, Select } from "@mantine/core"

export  function AdvertisingForm() {
  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const advertisingData = {
          name: data?.name
        };
        const response = await postAdvertising(advertisingData);
        console.log('Publicidad creada:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando la Publicidad:', error);
        // Manejar el error
      } 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Nombre de la Publicidad:
      <Input {...register("name")} />
      <br />
      <br />

      <Center><Button type="submit">Crear Publicidad</Button></Center>
    </form>
  )
}