import { useForm } from "react-hook-form"
import { postMotor } from "../services/Motors"
import { Input, Button ,Center } from "@mantine/core"

export  function MotorForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const motorData = {
          name: data?.name,
        };
        const response = await postMotor(motorData);
        console.log('Motor creado:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando el motor:', error);
        // Manejar el error
      } 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Name:
      <Input {...register("name")} />
      <br />
      <br />
      <Center><Button type="submit">Crear Motor</Button></Center>
    </form>
  )
}