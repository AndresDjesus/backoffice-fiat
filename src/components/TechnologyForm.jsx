import { useForm } from "react-hook-form"
import { postTechnology } from "../services/Technology"
import { Input, Button ,Center } from "@mantine/core"
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

export  function TechnologyForm() {

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const technologyData = {
          title: data?.title,
          content: data?.content
        };
        const response = await postTechnology(technologyData);
        notifications.show({
          title: 'Exito',
          message: 'Tecnologia Creada exitosamente',
          color: 'green',
        });
        navigate('/listTechnology');
            console.log(data?.base64, 'RESULTADO DATA BASE 64');
            console.log('Technology creada:', response);
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