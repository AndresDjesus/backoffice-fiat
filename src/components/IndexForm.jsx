import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Input, Button } from "@mantine/core"
import { postIndex } from "../services/Index"

export  function IndexForm() {
  const { register, handleSubmit } = useForm()
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
        const response = await postIndex(indexData);
        console.log('Index creado:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando el index:', error);
        // Manejar el error
      } 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Title:
      <Input {...register("title")} />
      <br />
      <br />
      Contenido:
      <Input {...register("content")} />
      <br />
      <br />
    Apartado Buy Vehicle Title:
      <Input {...register("buyVehicletitle")} />
      <br />
      <br />
      Apartado Buy Vehicle Content:
      <Input {...register("buyVehiclecontent")} />
      <br />
      <br />
      Apartado Por que Nosotros:
      <Input {...register("WhiWe")} />
      <br />
      <br />
       Apartado Buscando Vehiculos:
      <Input {...register("LookingforVehicle")} />
      <br />
      <br />
      <Button type="submit">Crear Pagina Principal</Button>
    </form>
  )
}