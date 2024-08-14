import { useForm } from "react-hook-form"
import { postInside } from "../services/Inside"
import { Input, Button ,Center } from "@mantine/core"

export  function InteriorForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const interiorData = {
          title: data?.title,
          content: data?.content
        };
        const response = await postInside(interiorData);
        console.log('Interior creado:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando el interior:', error);
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
      <Center><Button type="submit">Crear Interior</Button></Center>
    </form>
  )
}