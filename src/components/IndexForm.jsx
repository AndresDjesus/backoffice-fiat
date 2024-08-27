import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { Input, Button , Center} from "@mantine/core"
import { postIndex } from "../services/Index"
import { postImage } from '../services/Images';

export  function IndexForm() {
  const { register, handleSubmit, setValue } = useForm()
  const [images, setImages] = useState([]); // Array for storing multiple images
  const [principal, setPrincipal] = useState(false);
  const [indexId, setIndexId] = useState(null); 
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
    setValue('buyVehicletitle', '');
    setValue('buyVehiclecontent', '');
    setValue('WhiWe', '');
    setValue('LookingforVehicle', '');
  };
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const indexData = {
          title: data?.title,
          content: data?.content,
          buyVehicletitle: data?.buyVehicletitle,
          buyVehiclecontent: data?.buyVehiclecontent,
          WhiWe : data?.WhiWe,
          LookingforVehicle : data?.LookingforVehicle
        };

        // Create Index
      const indexResponse = await postIndex(indexData);

      // Save index ID
      setIndexId(indexResponse.id);

      // Send each image to the server
      for (const image of images) {
        const imageData = {
          base64: image,
          principal: principal,
          index_id: indexResponse.id
        };
        await postImage(imageData);
      }
  
         // Combina las respuestas o realiza otras acciones según sea necesario
          console.log(data?.base64, 'RESULTADO DATA BASE 64');
         console.log('Index creado:', indexResponse);
         
      } catch (error) {
         console.error('Error:', error);
        } 

        
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Title:
      <Input {...register("title")} />
      <br />
      <br />
      Contenido:
      <Input {...register("content")} />
      <br />
      <br />
    Apartado Buy Vehicle Title:
      <Input {...register("buyVehicletitle")} />
      <br />
      <br />
      Apartado Buy Vehicle Content:
      <Input {...register("buyVehiclecontent")} />
      <br />
      <br />
      Apartado Por que Nosotros:
      <Input {...register("WhiWe")} />
      <br />
      <br />
       Apartado Buscando Vehiculos:
      <Input {...register("LookingforVehicle")} />
      <br />
      <br />

    Imagen Principal:
      <input type="checkbox" id="principal" name="principal" checked={principal} onChange={(e) => setPrincipal(e.target.checked)} />
      <label htmlFor="principal">Imagen principal</label>
      <br /><br />
      Imagenes: (Puede seleccionar un maximo de DOS imagenes por Design)
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
      <Center><Button type="submit">Crear Pagina Principal</Button></Center>
      <br />
      <Center><Button variant="outline" onClick={handleClearForm}>Limpiar Formulario</Button> </Center>
    </form>
  )
}