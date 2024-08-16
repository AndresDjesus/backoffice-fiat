import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getVehicleById } from '../services/Vehicles';
import { putVehicles} from '../services/Vehicles';
import { getCombustible } from '../services/Combustible';
import { getCategory } from '../services/Category';
import { getMotors } from '../services/Motors';
import { getInsides } from '../services/Inside';
import {getDesigns} from '../services/Design';
import {getTechnology} from '../services/Technology';
import { useParams } from 'react-router-dom';

// Nuevo componente para el formulario
export function VehiclePutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

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
      const response = await putVehicles(vehicleData, id);
      console.log(vehicleData);
      console.log('Vehículo modificado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando vehículo:', error);
      // Manejar el error
    }
  };
  
  const [vehicleData, setVehicleData] = useState(null);
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

    const fetchVehicle = async () => {
      try {
        const response = await getVehicleById(id);
        console.log('Response:', response);
        setVehicleData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    fetchCombustible();
    fetchCategory();
    fetchMotors();
    fetchInsides();
    fetchDesigns();
    fetchTechnology();
    fetchVehicle();

  }, []);

   useEffect(() => {
     if (vehicleData) {
      
  //     // setValue("name", vehicleData?.name);
  //     // setValue("year", vehicleData?.year);
  //     // setValue("price", vehicleData?.price);
  //     // setValue("description", vehicleData?.description);
  //     // setValue("transmission", vehicleData?.transmission);
  //     // setValue("screen", vehicleData?.screen);
  //     // setValue("category_id", vehicleData?.category_id);
  //     // setValue("combustible_id", vehicleData?.combustible_id);
  //     // setValue("motor_id", vehicleData?.motor_id);
  //     // setValue("inside_id", vehicleData?.inside_id);
  //     // setValue("design_id", vehicleData?.design_id);
  //     // setValue("technology_id", vehicleData?.technology_id);
       reset({
         name: vehicleData?.name,
         category_id: vehicleData?.category?.id?.toString(),
         combustible_id: vehicleData?.combustible?.id?.toString(),
         motor_id: vehicleData?.motor?.id?.toString(),
         inside_id: vehicleData?.inside?.id?.toString(),
         design_id: vehicleData?.design?.id?.toString(),
         technology_id: vehicleData?.technology?.id?.toString(),
         year: vehicleData?.year,
         price: vehicleData?.price,
         description: vehicleData?.description,
         transmission: vehicleData?.transmission,
         screen: vehicleData?.screen
       });
     }
  }, [vehicleData]); 



  console.log(vehicleData, 'vehicleData');
  console.log(vehicleData?.category?.id, "category_id");

  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Name:
      <Input {...register("name")} defaultValue={vehicleData?.name}/>
      <br />
      <br />
      Year:
      <Input {...register("year")} defaultValue={vehicleData?.year} />
      <br />
      <br />
      Price:
      <Input {...register("price")} defaultValue={vehicleData?.price} />
      <br />
      <br />
      Description:
      <Input {...register("description")} defaultValue={vehicleData?.description}  />
      <br />
      <br />
      <Select
        label="Transmision" 
        data={["manual", "automatic"]}
        onChange={(e) => setValue("transmission", e)}
        value={vehicleData?.transmission?.toString()}
      />
      <br />
      <br />
      Screen:
      <Input {...register("screen")}  defaultValue={vehicleData?.screen}/>
      <br />
      <br />
      <Select 
        label="Categoria"
        name="category_id"
        comboboxProps={{ withinPortal: true }}
        data={category?.map((category) => { 
          return {value: category?.id?.toString(), label: category?.name }
        }, )
      }
        onChange={(e) => {
          console.log(e)
          setValue("category_id", e)
        }
        }
        value={vehicleData?.category?.id?.toString()}
       
      />
      <br />
      <br /> 
      <Select 
        label="Combustible"
        name="combustible_id"
        data={
          combustible?.map((combustible) => { 
            return {value: combustible?.id?.toString(), label: combustible?.name }
          })
        }
        onChange={(e) => setValue("combustible_id", e)}
        value={vehicleData?.combustible?.id?.toString()}
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
        value={vehicleData?.motor?.id?.toString()}
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
        value={vehicleData?.inside?.id?.toString()}
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
        value={vehicleData?.design?.id?.toString()}
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
        value={vehicleData?.technology?.id?.toString()}
      />
      
      <br />
      <br /><br />
      <Center><Button type="submit">Modificar Vehiculo</Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}

