import { useForm } from "react-hook-form"
import { Input, Button } from "@mantine/core"
import { postCategory } from "../services/Category"

export  function CategoryForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const categoryData = {
          name: data?.name,
        };
        const response = await postCategory(categoryData);
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