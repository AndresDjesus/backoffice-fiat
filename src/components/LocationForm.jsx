import React ,{ useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { postLocation} from "../services/Location"
import { Input, Button ,Center, Select } from "@mantine/core"
import { add } from 'date-fns';
import { getCompanys } from '../services/Company';

export  function LocationForm() {
  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = async (data) => {
    try {
        // Construye el objeto con los datos a enviar
        const locationData = {
          address: data?.address,
          latitude: data?.latitude, 
          longitude: data?.longitude,
          company_id: Number(data?.company_id)
        };
        const response = await postLocation(locationData);
        console.log('Location creada:', response);
        // Manejar la respuesta del servidor
      } catch (error) {
        console.error('Error creando la location:', error);
        // Manejar el error
      } 
  };

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompanys();
      setCompanies(data || []);
    };
    fetchCompanies();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Direccion de la Empresa:
      <Input {...register("address")} />
      <br />
      <br />
      Data Latitud de la Empresa:
      <Input {...register("latitude")} />
      <br />
      <br />
      Data Longitud de la Empresa:
      <Input {...register("longitude")} />
      <br />
      <br />

      <Select    
        label="Nombre de la Empresa"
        data={companies?.map((companies) => { 
          return {value: companies?.id?.toString(), label: companies?.name }
        })
      }
      onChange={(e) => {
        console.log(e)
        setValue("company_id", e)
      }}
    />
    <br />
    <br />
      <Center><Button type="submit">Crear Ubicacion</Button></Center>
    </form>
  )
}