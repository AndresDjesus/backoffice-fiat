import React ,{ useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Box, Grid, TextInput, Button, Text, Title, Center, Image , Input, Select} from "@mantine/core";
import { postVehicles} from '../services/Vehicles';
import { getCombustible } from '../services/Combustible';
import { getCategory } from '../services/Category';
import { getMotors } from '../services/Motors';
import { getInsides } from '../services/Inside';
import {getDesigns} from '../services/Design';
import {getTechnology} from '../services/Technology';
import { postImage } from '../services/Images';

export function VehicleForm() {
  const { register, handleSubmit, setValue } = useForm()
  const [images, setImages] = useState([]); // Array for storing multiple images
  const [principal, setPrincipal] = useState(false);
  const [vehicleId, setVehicleId] = useState(null); 
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
    setValue('year', '');
    setValue('price', '');
    setValue('description', '');
    setValue('transmission', '');
    setValue('screen', '');
    setValue('category_id', '');
    setValue('combustible_id', '');
    setValue('motor_id', '');
    setValue('inside_id', '');
    setValue('design_id', '');
    setValue('technology_id', '');
    setValue('image', '');
  };


  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const vehicleData = {
        name: data?.name,
        year: data?.year,
        price: data?.price,
        description: data?.description,
        transmission: data?.transmission,
        screen: data?.screen,
        category_id: Number(data?.category_id),
        combustible_id: Number (data?.combustible_id),
        motor_id: Number(data?.motor_id),
        inside_id: Number(data?.inside_id ),
        design_id: Number(data?.design_id ),
        technology_id: Number(data?.technology_id ),
      };
  // Create Vehicle
  const vehicleResponse = await postVehicles(vehicleData);

  // Save vehicle ID
  setVehicleId(vehicleResponse.id);

  // Send each image to the server
  for (const image of images) {
  const imageData = {
    base64: image,
    principal: principal,
    vehicle_id: vehicleResponse.id
  };
  await postImage(imageData);
  }

   // Combina las respuestas o realiza otras acciones según sea necesario
    console.log(data?.base64, 'RESULTADO DATA BASE 64');
   console.log('Vehiculo creado:', vehicleResponse);
   
  } catch (error) {
   console.error('Error:', error);
  } 

  
  };
  
  const [combustible, setCombustible] = useState([]);
  const [category, setCategory] = useState([]);
  const [motors, setMotors] = useState([]);
  const [insides, setInsides] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [technology, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchCombustible = async () => {
      const data = await getCombustible();
      setCombustible(data || []);
    };
    
    const fetchCategory = async () => {
      const data = await getCategory();
      setCategory(data || []);
    };

    const fetchMotors = async () => {
       const data = await getMotors();
       setMotors(data || []);
    };

    const fetchInsides = async () => {
      const data = await getInsides();
      setInsides(data || []);
    };

    const fetchDesigns = async () => {
      const data = await getDesigns();
      setDesigns(data || []);
    };

    const fetchTechnology = async () => {
      const data = await getTechnology();
      setTechnologies(data || []);
    };

    fetchCombustible();
    fetchCategory();
    fetchMotors();
    fetchInsides();
    fetchDesigns();
    fetchTechnology();

  }, [])

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Name:
      <Input {...register("name")} />
      <br />
      <br />
      Year:
      <Input {...register("year")} />
      <br />
      <br />
      Price:
      <Input {...register("price")} />
      <br />
      <br />
      Description:
      <Input {...register("description")} />
      <br />
      <br />
      <Select
        label="Transmision" 
        data={["manual", "automatic"]}
        onChange={(e) => setValue("transmission", e)}
      />
      <br />
      <br />
      Screen:
      <Input {...register("screen")} />
      <br />
      <br />
      <Select 
        label="Categoria"
        data={category?.map((category) => { 
          return {value: category?.id?.toString(), label: category?.name }
        })
      }
        onChange={(e) => {
          console.log(e)
          setValue("category_id", e)
        }}
      />
      <br />
      <br /> 
      <Select 
        label="Combustible"
        data={
          combustible?.map((combustible) => { 
            return {value: combustible?.id?.toString(), label: combustible?.name }
          })
        }
        onChange={(e) => setValue("combustible_id", e)}
      />
      <br />
      <br />
      <Select 
        label="Motor"
        data={
          motors?.map((motors) => { 
            return {value: motors?.id?.toString(), label: motors?.name }
          })
        }
        onChange={(e) => setValue("motor_id", e)}
      />
      <br />
      <br />
      <Select
        label="Interior"
        data={
          insides?.map((insides) => { 
            return {value: insides?.id?.toString(), label: insides?.content }
          })
        }
        onChange={(e) => setValue("inside_id", e)}
      />
      <br />
      <br />
      <Select
        label="Diseno"
        data={
          designs?.map((designs) => { 
            return {value: designs?.id?.toString(), label: designs?.content }
          })
        }
        onChange={(e) => setValue("design_id", e)}
      />
      <br />
      <br />
      <Select
        label="Tecnologia"
        data={
          technology?.map((technology) => { 
            return {value: technology?.id?.toString(), label: technology?.title }
          })
        }
        onChange={(e) => setValue("technology_id", e)}
      />
      
      <br />
      <br /><br />
      Imagen Principal:
      <input type="checkbox" id="principal" name="principal" checked={principal} onChange={(e) => setPrincipal(e.target.checked)} />
      <label htmlFor="principal">Imagen principal</label>
      <br /><br />
      Imagenes: (Puede seleccionar un maximo de CINCO imagenes por Vehiculo)
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
      <Center><Button type="submit">Crear Vehiculo</Button></Center>
      <br />
      <Center><Button variant="outline" onClick={handleClearForm}>Limpiar Formulario</Button> </Center>
    </form>
  );
}

