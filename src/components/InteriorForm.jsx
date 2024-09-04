import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { postInside } from "../services/Inside"
import { postImage } from '../services/Images';
import { Input, Button ,Center, Image } from "@mantine/core"
import '@mantine/notifications/styles.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from "react-router-dom";


export  function InteriorForm() {

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm()
  const [images, setImages] = useState([]); // Array for storing multiple images
  const [principal, setPrincipal] = useState(false);
  const [insideId, setInsideId] = useState(null); 
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
    setValue('title', ''); // Clear name input value using setValue from react-hook-form
    setValue('content', '');
  };

  const onSubmit = async (data) => {
    try {
      // Build advertising data object
      const insideData = {
        title: data?.title,
        content: data?.content
      };

      // Create Inside
      const insideResponse = await postInside(insideData);

      // Save inside ID
      setInsideId(insideResponse.id);

      // Send each image to the server
      for (const image of images) {
        const imageData = {
          base64: image,
          principal: principal,
          inside_id: insideResponse.id
        };
        await postImage(imageData);
      }
      notifications.show({
        title: 'Exito',
        message: 'Interior Creado exitosamente',
        color: 'green',
      });
      navigate('/listInside');
          console.log(data?.base64, 'RESULTADO DATA BASE 64');
         console.log('Interior creado:', insideResponse);
         
      } catch (error) {
         console.error('Error:', error);
        } 

        
  };
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
      Imagen Principal:
      <input type="checkbox" id="principal" name="principal" checked={principal} onChange={(e) => setPrincipal(e.target.checked)} />
      <label htmlFor="principal">Imagen principal</label>
      <br /><br />
      Imagenes: (Puede seleccionar un maximo de DOS imagenes por Interior)
      <br /><br />
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      {/* Previews for selected images */}
      {images.length > 0 && (
      <div>
        <h2>Imágenes Seleccionadas:</h2>
        {images.map((image, index) => (
          <div key={index}>
            <img src={`data:image/png;base64,${image}`} alt={`Imagen ${index + 1}`} width={200} height={100} />
          </div>
        ))}
      </div>
      )}
      <br />
      <br />
      <Center><Button type="submit">Crear Interior</Button></Center>
      <br />
      <Center><Button variant="outline" onClick={handleClearForm}>Limpiar Formulario</Button> </Center>
    </form>
  )
}