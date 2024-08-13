import { useForm } from "react-hook-form"
import { Input, Button } from "@mantine/core"
import { postCombustible } from "../services/Combustible"

export  function CombustibleForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const combustibleData = {
          name: data?.name,
          ciudad: data?.ciudad,
          carretera: data?.carretera,
          description: data?.description
        };
        const response = await postCombustible(combustibleData);
        console.log('Combustible creado:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando el combustible:', error);
        // Manejar el error
      } 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Name:
      <Input {...register("name")} />
      <br />
      <br />
      Rendimiento en Ciudad:
      <Input {...register("ciudad")} />
      <br />
      <br />
      Rendimiento en Carretera:
      <Input {...register("carretera")} />
      <br />
      <br />
      Descripcion:
      <Input {...register("description")} />
      <br />
      <br />
      <Button type="submit">Crear Combustible</Button>
    </form>
  )
}