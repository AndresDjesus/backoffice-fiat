import { useForm } from "react-hook-form"
import { Input, Button } from "@mantine/core"
import { postCategory } from "../services/Category"
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

export  function CategoryForm() {

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const categoryData = {
          name: data?.name,
        };
        const response = await postCategory(categoryData);
        notifications.show({
          title: 'Exito',
          message: 'Categoria Creada exitosamente',
          color: 'green',
        });
          navigate('/listCategories');
            console.log(data?.base64, 'RESULTADO DATA BASE 64');
        console.log('Categoria creado:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando la categoria:', error);
        // Manejar el error
      } 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Name:
      <Input {...register("name")} />
      <br />
      <br />
      <Button type="submit">Crear Categoria</Button>
    </form>
  )
}