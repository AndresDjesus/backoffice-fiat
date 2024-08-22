import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getFooterById } from '../services/Footer';
import { putFooter} from '../services/Footer';
import { useParams } from 'react-router-dom';
import { click } from "@testing-library/user-event/dist/click";

// Nuevo componente para el formulario
export function FooterPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

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
      const response = await putFooter(footerData, id);
      console.log(footerData);
      console.log('Footer modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando el Footer:', error);
      // Manejar el error
    }
  };
  
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {

    const fetchFooter = async () => {
      try {
        const response = await getFooterById(id);
        console.log('Response:', response);
        setFooterData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching Footer:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchFooter();

  }, []);

   useEffect(() => {
     if (footerData) {
      
        setValue("address",footerData?.address);
        setValue("email",footerData?.email);
        setValue("phone",footerData?.phone);
        setValue("social_networks.gmail",footerData?.social_networks?.gmail?.username);
        setValue("social_networks.gmailUrl",footerData?.social_networks?.gmail?.url);
        setValue("social_networks.instagram",footerData?.social_networks?.instagram?.username);
        setValue("social_networks.instagramUrl",footerData?.social_networks?.instagram?.url);
        setValue("social_networks.whatsapp",footerData?.social_networks?.whatsapp?.number);
        setValue("social_networks.whatsappUrl",footerData?.social_networks?.whatsapp?.url);
       reset({
         address: footerData?.address,
         email: footerData?.email,
         phone: footerData?.phone,
         social_networks: {
           gmail: footerData?.social_networks?.gmail?.username,
           gmailUrl: footerData?.social_networks?.gmail?.url,
           instagram: footerData?.social_networks?.instagram?.username,
           instagramUrl: footerData?.social_networks?.instagram?.url,
           whatsapp: footerData?.social_networks?.whatsapp?.number,
           whatsappUrl: footerData?.social_networks?.whatsapp?.url
         }
          
       });
     }
  }, [footerData]); 

  console.log(footerData, 'footerData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Direccion:
      <Input {...register("address")} defaultValue={footerData?.address}/>
      <br />
      <br />
      Email:    
      <Input {...register("email")} defaultValue={footerData?.email}/>
      <br />
      <br />
      Telefono:
      <Input {...register("phone")} defaultValue={footerData?.phone}/>
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
          <Input {...register("social_networks.gmail")} defaultValue={footerData?.social_networks?.gmail?.username}/>
          <br />
          URL de Gmail:
          <Input {...register("social_networks.gmailUrl")} defaultValue={footerData?.social_networks?.gmail?.url}/>
        </div>
        <div>
          <br />
          Instagram:
          <br />
          Usuario de Instagram:
          <Input {...register("social_networks.instagram",)} defaultValue={footerData?.social_networks?.instagram?.username}/>
          <br />
          URL de Instagram:
          <Input {...register("social_networks.instagramUrl")} defaultValue={footerData?.social_networks?.instagram?.url}/>
        </div>
        <br />
        <div>
          Whatsapp:
          <br />
          Número de Whatsapp:
          <Input {...register("social_networks.whatsapp")} defaultValue={footerData?.social_networks?.whatsapp?.number}/>
          <br />
          URL de Whatsapp:
          <Input {...register("social_networks.whatsappUrl")} defaultValue={footerData?.social_networks?.whatsapp?.url}/>
        </div>
      </div>
      <br />
      <Center><Button type="submit">Modificar Pie de Pagina </Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}