import { useForm } from "react-hook-form"
import { postService } from "../services/Service"
import { Input, Button ,Center } from "@mantine/core"

export  function ServiceForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const serviceData = {
          name: data?.name,
          description: data?.description
        };
        const response = await postService(serviceData);
        console.log('Servicio creado:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando el Servicio:', error);
        // Manejar el error
      } 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Nombre del Servicio:
      <Input {...register("name")} />
      <br />
      <br />
      Descripcion:
      <Input {...register("description")} />
      <br />
      <br />
      <Center><Button type="submit">Crear Servicio</Button></Center>
    </form>
  )
}