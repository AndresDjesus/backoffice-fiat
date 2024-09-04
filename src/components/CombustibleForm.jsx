import { useForm } from "react-hook-form"
import { Input, Button } from "@mantine/core"
import { postCombustible } from "../services/Combustible"
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";


export  function CombustibleForm() {

  const navigate = useNavigate();

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
        notifications.show({
          title: 'Exito',
          message: 'Combustible Creado exitosamente',
          color: 'green',
        });
          navigate('/listCombustible');
            console.log(data?.base64, 'RESULTADO DATA BASE 64');
        console.log('Combustible creado:', response);
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