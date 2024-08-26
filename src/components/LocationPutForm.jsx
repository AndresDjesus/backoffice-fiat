import { useNavigate } from "react-router-dom";
import { Box, Grid, TextInput, Button , Text, Title, Center, Image , Input, Select} from '@mantine/core';

import { useEffect, useState } from 'react';
import { useForm , reset} from 'react-hook-form';
import { getLocationById } from '../services/Location';
import { putLocation} from '../services/Location';
import { useParams } from 'react-router-dom';
import { getCompanys } from '../services/Company';
import { click } from "@testing-library/user-event/dist/click";

// Nuevo componente para el formulario
export function LocationPutForm() {

  const { id } = useParams();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Construye el objeto con los datos a enviar
      const locationData = {
        address: data?.address,
        latitude: data?.latitude, 
        longitude: data?.longitude,
        company_id: data?.company_id
      };
      const response = await putLocation(locationData, id);
      console.log(locationData);
      console.log('Ubicacion modificada:', response);
      // Manejar la respuesta del servidor
    } catch (error) {
      console.error('Error modificando la ubicacion:', error);
      // Manejar el error
    }
  };
  
  const [locationData, setLocationData] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {

    const fetchLocation = async () => {
      try {
        const response = await getLocationById(id);
        console.log('Response:', response);
        setLocationData(response); // Suponiendo que la respuesta tiene un campo 'data'
      } catch (error) {
        console.error('Error fetching Location:', error);
        // Mostrar mensaje de error al usuario
      }
    };

    const fetchCompanies = async () => {
        const data = await getCompanys();
        setCompanies(data || []);
      };

    fetchLocation();
    
    fetchCompanies();
  }, []);

   useEffect(() => {
     if (locationData) {
      
        setValue("address", locationData?.address);
        setValue("latitude", locationData?.latitude);
        setValue("longitude", locationData?.longitude);
        setValue("company_id", locationData?.company_id);
       reset({
         address: locationData?.address,
         latitude: locationData?.latitude,
         longitude: locationData?.longitude,
         company_id: locationData?.company_id  
       });
     }
  }, [locationData]); 

  console.log(locationData, 'locationData');


  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
      Direccion:
      <Input {...register("address")} defaultValue={locationData?.address}/>
      <br />
      <br />
      Data Latitud:
      <Input {...register("latitude")} defaultValue={locationData?.latitude}/>
      <br />
      <br />
      Data Longitud:
      <Input {...register("longitude")} defaultValue={locationData?.longitude}/>
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
      <Center><Button type="submit">Modificar Ubicacion </Button></Center>
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}