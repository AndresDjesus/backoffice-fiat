import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { postBlog} from "../services/Blog"
import { Input, Button ,Center, Select } from "@mantine/core"
import { postImage } from '../services/Images';
  export function BlogForm() {
    const { register, handleSubmit, setValue } = useForm({
      defaultValues: {
        date: new Date().toISOString() // Establece una fecha predeterminada
      },
      validation: {
        date: {
          required: true,
          validate: (value) => {
            // Agrega lógica de validación personalizada de fecha aquí si es necesario
            return value && !isNaN(Date.parse(value));
          }
        }
      }
    });

    const [images, setImages] = useState([]); // Array for storing multiple images
    const [principal, setPrincipal] = useState(false);
    const [blogId, setBlogId] = useState(null); 

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
      setValue('description', '');
      setValue('content', '');
      setValue('date', '');
    };
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const blogData = {
          title: data?.title,
          description: data?.description,
          content: data?.content,
          date : data?.date,
        };
        // Create blog
      const blogResponse = await postBlog(blogData);

      // Save advertising ID
      setBlogId(blogResponse.id);

      // Send each image to the server
      for (const image of images) {
        const imageData = {
          base64: image,
          principal: principal,
          blog_id: blogResponse.id
        };
        await postImage(imageData);
      }
  
         // Combina las respuestas o realiza otras acciones según sea necesario
          console.log(data?.base64, 'RESULTADO DATA BASE 64');
         console.log('Post creado con exito:', blogResponse);
         
      } catch (error) {
         console.error('Error:', error);
        } 

        
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Nombre del Post:
      <Input {...register("title")} />
      <br />
      <br />
      Descripion del Post:
      <Input {...register("description")} />
      <br />
      <br />
      Contenido del Post:
      <Input {...register("content")} />
      <br />
      <br />
      Fecha de Creacion:
      <Input {...register("date")} />
      <br />
      <br />
      Imagen Principal:
      <input type="checkbox" id="principal" name="principal" checked={principal} onChange={(e) => setPrincipal(e.target.checked)} />
      <label htmlFor="principal">Imagen principal</label>
      <br /><br />
      Imagene: (Puede seleccionar solo UNA imagen por Post)
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
      <Center><Button type="button" onClick={handleClearForm}>Limpiar Formulario</Button> </Center>
      <br />
      <Center><Button type="submit">Crear Post</Button></Center>
    </form>
  )
}