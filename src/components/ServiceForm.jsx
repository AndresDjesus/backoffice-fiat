import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { postService } from "../services/Service"
import { Input, Button ,Center } from "@mantine/core"
import { postImage } from '../services/Images';
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";

export  function ServiceForm() {
  const { register, handleSubmit, setValue } = useForm()
  const [images, setImages] = useState([]); // Array for storing multiple images
  const [principal, setPrincipal] = useState(false);
  const [serviceId, setServiceId] = useState(null); 

  const navigate = useNavigate();
  
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
    setValue('name', ''); // Clear name input value using setValue from react-hook-form
    setValue('description', '');
  };

  const onSubmit = async (data) => {
    try {
      // Build service data object
      const serviceData = {
        name: data?.name,
        description: data?.description
      };

      // Create service
      const serviceResponse = await postService(serviceData);

      setServiceId(serviceResponse.id);

      // Send each image to the server
      for (const image of images) {
        const imageData = {
          base64: image,
          principal: principal,
          service_id: serviceResponse.id
        };
        await postImage(imageData);
      }
      notifications.show({
        title: 'Exito',
        message: 'Servicio Creado exitosamente',
        color: 'green',
      });
      navigate('/listService');
          console.log(data?.base64, 'RESULTADO DATA BASE 64');
         console.log('Servicio creado:', serviceResponse);
         
      } catch (error) {
         console.error('Error:', error);
        } 
        
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    Nombre del Servicio:
    <Input {...register("name")} />
    <br />
    <br />
    Descripción del Servicio:
    <Input {...register("description")} />
    <br />
    <br />
    Imagen Principal:
    <input type="checkbox" id="principal" name="principal" checked={principal} onChange={(e) => setPrincipal(e.target.checked)} />
    <label htmlFor="principal">Imagen principal</label>
    <br /><br />
    Imagen: (Seleccione la Imagen para su Servicio)
    <br /><br />
    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
    {/* Previews for selected images */}
    {images.length > 0 && (
      <div>
        <h2>Imagen Seleccionadas:</h2>
        {images.map((image, index) => (
          <div key={index}>
            <img src={`data:image/png;base64,${image}`} alt={`Imagen ${index + 1}`} width={200} height={100} />
          </div>
        ))}
      </div>
    )}
    <br />
    <br />
    <Center><Button type="submit">Crear Servicio</Button></Center>
    <br />
    <Center><Button variant="outline" onClick={handleClearForm}>Limpiar Formulario</Button> </Center>
  </form>
  )
}