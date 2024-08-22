import { useForm } from "react-hook-form"
import { postFooter } from "../services/Footer"
import { Input, Button ,Center } from "@mantine/core"

  export function FooterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        try {
          // ... código existente
          const footerData = {
            address: data.address,
            email: data.email,
            phone: data.phone,
            social_networks: {
              gmail: {
                username: data.social_networks.gmail, // Suponiendo que el email es el nombre de usuario
                url: data.social_networks.gmailUrl || "", // Manejar URL opcional (si es necesario)
              },
              instagram: {
                username: data.social_networks.instagram,
                url: data.social_networks.instagramUrl || "", // Manejar URL opcional (si es necesario)
              },
              whatsapp: {
                number: data.social_networks.whatsapp,
                url: data.social_networks.whatsappUrl || "", // Manejar URL opcional (si es necesario)
              },
            },
          };
    
          const response = await postFooter(footerData);
          console.log('Footer creado:', response);
          // Handle server response (e.g., display success message)
        } catch (error) {
          console.error('Error creando el Footer:', error);
          // Handle errors (e.g., display error message)
        }
      };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    Dirección:
    <Input {...register("address")} />
    <br />
    Email:
    <Input {...register("email")} />
    <br />
    Telefono:
    <Input {...register("phone")} />
    <br />
    {/* ... other form fields ... */}
    <div>
      Redes Sociales:
      <br />
      <div>
        <br />
        Gmail:
        <br />
        Nombre de usuario de Gmail:
        <Input {...register("social_networks.gmail")} />
        <br />
        URL de Gmail:
        <Input {...register("social_networks.gmailUrl")} />
      </div>
      <div>
        <br />
        Instagram:
        <br />
        Usuario de Instagram:
        <Input {...register("social_networks.instagram",)} />
        <br />
        URL de Instagram:
        <Input {...register("social_networks.instagramUrl")} />
      </div>
      <br />
      <div>
        Whatsapp:
        <br />
        Número de Whatsapp:
        <Input {...register("social_networks.whatsapp")} />
        <br />
        URL de Whatsapp:
        <Input {...register("social_networks.whatsappUrl")} />
      </div>
      {/* ... other social media fields ... */}
    </div>
    <br /> <br />
    {/* ... rest of form ... */}
    <Center><Button type="submit">Crear Pie de Pagina</Button></Center>
  </form>
  )
}