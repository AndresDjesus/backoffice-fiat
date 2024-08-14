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

export function VehicleForm() {
  const { register, handleSubmit, setValue } = useForm();

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
      const response = await postVehicles(vehicleData);
      console.log('Vehículo creado:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error creando vehículo:', error);
      // Manejar el error
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
      <Center><Button type="submit">Crear Vehiculo</Button></Center>
    </form>
  );
}

