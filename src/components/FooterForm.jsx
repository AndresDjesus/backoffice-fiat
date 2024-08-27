import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { postFooter } from "../services/Footer"
import { postImage } from '../services/Images';
import { Input, Button ,Center } from "@mantine/core"

  export function FooterForm() {
    const { register, handleSubmit, setValue } = useForm()
    const [images, setImages] = useState([]); // Array for storing multiple images
    const [principal, setPrincipal] = useState(false);
    const [footerId, setFooterId] = useState(null); 
    const handleImageChange = (e) => {
      const files = e.target.files; // Get all selected files
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 1024 * 1024 * 2; // 2 MB
        const reader = new FileReader();
  
        if (!allowedTypes.includes(file.type)) {
          alert('Solo se permiten imágenes JPEG, PNG y GIF.');
          return;
        }
  
        if (file.size > maxSize) {
          alert('La imagen es demasiado grande. El tamaño máximo permitido es de 2 MB.');
          return;
        }
  
        reader.onloadend = () => {
          if (reader.readyState === FileReader.DONE) {
            const base64String = reader.result.split(',')[1]; // Extract base64 data
            setImages(prevImages => [...prevImages, base64String]);
          }
        };
  
        reader.readAsDataURL(file);
      }
    };
  
    const handleClearForm = () => {
      setImages([]); // Clear images array
      setPrincipal(false); // Reset principal checkbox
      setValue('address', ''); // Clear name input value using setValue from react-hook-form
      setValue('email', '');
      setValue('phone', '');
      setValue('social_networks.gmail', '');
      setValue('social_networks.gmailUrl', '');
      setValue('social_networks.instagram', '');
      setValue('social_networks.instagramUrl', '');
      setValue('social_networks.whatsapp', '');
      setValue('social_networks.whatsappUrl', '');
    };    const onSubmit = async (data) => {
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
    
          // Create Footer
      const footerResponse = await postFooter(footerData);

      // Save design ID
      setDesignId(designResponse.id);

      // Send each image to the server
      for (const image of images) {
        const imageData = {
          base64: image,
          principal: principal,
          design_id: designResponse.id
        };
        await postImage(imageData);
      }
  
         // Combina las respuestas o realiza otras acciones según sea necesario
          console.log(data?.base64, 'RESULTADO DATA BASE 64');
         console.log('Design creado:', designResponse);
         
      } catch (error) {
         console.error('Error:', error);
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