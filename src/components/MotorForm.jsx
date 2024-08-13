import { useForm } from "react-hook-form"
import { postMotor, postMotors } from "../services/Motors"

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
      <input {...register("name")} />
      <br />
      <br />
      <input type="submit" />
    </form>
  )
}