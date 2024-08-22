import { useForm } from "react-hook-form"
import { postFooter } from "../services/Footer"
import { Input, Button ,Center } from "@mantine/core"
import * as yup from "yup"; 
import { yupResolver } from '@hookform/resolvers/yup';

const socialNetworkSchema = yup.object({
    username: yup.string().required(),
    url: yup.string().url().optional(), // Optional URL validation
  });

  export function FooterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(
        yup.object({
          address: yup.string().required(),
          email: yup.string().email().required(),
          phone: yup.string().required(),
          social_networks: yup.object().required().shape({
            gmail: socialNetworkSchema,
            instagram: socialNetworkSchema,
            whatsapp: socialNetworkSchema.omit('url'), // Optional URL for whatsapp
          }),
        })
      ),
    });
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
    <br />
    Email:
    <Input {...register("email")} />
    <br />
    <br />
    Telefono:
    <Input {...register("phone")} />
    <br />
    <br />
    {/* ... other form fields ... */}
    <div>
      Redes Sociales:
      {errors.social_networks && <p>Error: {errors.social_networks.message}</p>} {/* Display validation errors */}
      <div>
        Gmail:
        <Input {...register("social_networks.gmail", socialNetworkSchema)} />
        {errors.social_networks?.gmail && <p>Error: {errors.social_networks.gmail.message}</p>} {/* Display specific validation errors */}
      </div>
      <div>
        Instagram:
        <Input {...register("social_networks.instagram", socialNetworkSchema)} />
        {errors.social_networks?.instagram && <p>Error: {errors.social_networks.instagram.message}</p>} {/* Display specific validation errors */}
      </div>
      <div>
        Whatsapp:
        <Input {...register("social_networks.whatsapp", socialNetworkSchema.omit('url'))} />
        {errors.social_networks?.whatsapp && <p>Error: {errors.social_networks.whatsapp.message}</p>} {/* Display specific validation errors */}
      </div>
      {/* ... other social media fields ... */}
    </div>
    {/* ... rest of form ... */}
    <Center><Button type="submit">Crear Pie de Pagina</Button></Center>
  </form>
  )
}