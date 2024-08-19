import { useForm } from "react-hook-form"
import { postTechnology } from "../services/Technology"
import { Input, Button ,Center } from "@mantine/core"

export  function TechnologyForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const technologyData = {
          title: data?.title,
          content: data?.content
        };
        const response = await postTechnology(technologyData);
        console.log('Technology creada:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando la technology:', error);
        // Manejar el error
      } 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Titulo:
      <Input {...register("title")} />
      <br />
      <br />
      Contenido:
      <Input {...register("content")} />
      <br />
      <br />
      <Center><Button type="submit">Crear Tecnologia</Button></Center>
    </form>
  )
}