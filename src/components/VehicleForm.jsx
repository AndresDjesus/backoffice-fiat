import React ,{ useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Box, Grid, TextInput, Button, Text, Title, Center, Image } from "@mantine/core";
import { postVehicles} from '../services/Vehicles';
import { getCombustible } from '../services/Combustible';
import { getCategory } from '../services/Category';
import { getMotors } from '../services/Motors';
import { getInsides } from '../services/Inside';
import {getDesigns} from '../services/Design';
import {getTechnology} from '../services/Technology';

export function VehicleForm() {
  const { register, handleSubmit } = useForm();

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
        category_id: parseInt(data?.category_id),
        combustible_id: parseInt (data?.combustible_id),
        motor_id: parseInt(data?.motor_id),
        inside_id: parseInt(data?.inside_id ),
        design_id: parseInt(data?.design_id ),
        technology_id: parseInt(data?.technology_id ),
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
  useEffect(() => {
    const fetchCombustible = async () => {
      const data = await getCombustible();
      setCombustible(data || []);
    };

    fetchCombustible(); // Llama a la función dentro del contexto asíncrono
  }, []);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategory();
      setCategory(data || []);
    };
    fetchCategory(); // Llama a la función dentro del contexto asíncrono
  }, []);
 
  const [motors, setMotors] = useState([]);
  useEffect(() => {
    const fetchMotors = async () => {
      const data = await getMotors();
      setMotors(data || []);
    };
    fetchMotors(); // Llama a la función dentro del contexto asíncrono
  }, []);

  const [insides, setInsides] = useState([]);
  useEffect(() => {
    const fetchInsides = async () => {
      const data = await getInsides();
      setInsides(data || []);
    };
    fetchInsides(); // Llama a la función dentro del contexto síncrono
  }, []);

  const [designs, setDesigns] = useState([]);
  useEffect(() => {
    const fetchDesigns = async () => {
      const data = await getDesigns();
      setDesigns(data || []);
    };
    fetchDesigns(); // Llama a la función dentro del contexto síncrono
  }, []);

  const [technology, setTechnology] = useState([]);
  useEffect(() => {
    const fetchTechnology = async () => {
      const data = await getTechnology();
      setTechnology(data || []);
    };
    fetchTechnology(); // Llama a la función dentro del contexto síncrono
  }, []);

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Name:
      <input {...register("name")} />
      <br />
      <br />
      Year:
      <input {...register("year")} />
      <br />
      <br />
      Price:
      <input {...register("price")} />
      <br />
      <br />
      Description:
      <input {...register("description")} />
      <br />
      <br />
      Transmission:
      <select {...register("transmission")}>
        <option value="manual">Manual</option>
        <option value="automtic">Automatica</option>
      </select>
      <br />
      <br />
      Screen:
      <input {...register("screen")} />
      <br />
      <br />
      Categoria:
      <select {...register("category_id")} >
        {category?.map(category => (
          <option key={category?.id} value={category?.id}>
            {category?.name}
          </option>
        ))}
      </select>
      <br />
      <br /> 
      Combustible:
      <select {...register("combustible_id")}>
        {combustible?.map(combustible => (
          <option key={combustible?.id} value={combustible?.id}>
            {combustible?.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      Motor:
      <select {...register("motor_id")}>
        {motors?.map(motors => (
          <option key={motors?.id} value={motors?.id}>
            {motors?.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      Interior:
      <select {...register("inside_id")}>
        {insides?.map(insides => (
          <option key={insides?.id} value={insides?.id}>
            {insides?.title}
          </option>
        ))}
      </select>
      <br />
      <br />
      Diseno:
      <select {...register("design_id")}>
        {designs?.map(designs => (
          <option key={designs?.id} value={designs?.id}>
            {designs?.title}
          </option>
        ))}
      </select>
      <br />
      <br />
      Tecnologia:
      <select {...register("technology_id")}>
        {technology?.map(technology => (
          <option key={technology?.id} value={technology?.id}>
            {technology?.title}
          </option>
        ))}
      </select>
      <br />
      <br /><br />
      <Center><input type="submit" /></Center>
    </form>
  );
}

