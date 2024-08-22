import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { postBlog} from "../services/Blog"
import { Input, Button ,Center, Select } from "@mantine/core"
  export function BlogForm() {
    const { register, handleSubmit, setValue } = useForm({
      defaultValues: {
        date: new Date().toISOString() // Establece una fecha predeterminada
      },
      validation: {
        date: {
          required: true,
          validate: (value) => {
            // Agrega lógica de validación personalizada de fecha aquí si es necesario
            return value && !isNaN(Date.parse(value));
          }
        }
      }
    });
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const blogData = {
          title: data?.title,
          description: data?.description,
          content: data?.content,
          date : data?.date,
        };
        const response = await postBlog(blogData);
        console.log('Post creado:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando el post:', error);
        // Manejar el error
      } 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Nombre del Post:
      <Input {...register("title")} />
      <br />
      <br />
      Descripion del Post:
      <Input {...register("description")} />
      <br />
      <br />

      Contenido del Post:
      <Input {...register("content")} />
      <br />
      <br />

      Fecha de Creacion:
      <Input {...register("date")} />
      <br />
      <br />

      <Center><Button type="submit">Crear Post</Button></Center>
    </form>
  )
}