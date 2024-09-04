import { useForm } from "react-hook-form"
import { postMotor } from "../services/Motors"
import { Input, Button ,Center } from "@mantine/core"
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

export  function MotorForm() {

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const motorData = {
          name: data?.name,
        };
        const response = await postMotor(motorData);
        notifications.show({
          title: 'Exito',
          message: 'Motor Creado exitosamente',
          color: 'green',
        });
        navigate('/listMotors');
            console.log(data?.base64, 'RESULTADO DATA BASE 64');
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