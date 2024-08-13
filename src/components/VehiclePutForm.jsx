import React, { useState } from 'react';
import { Box, Grid, TextInput, Button , Text, Title, Center} from '@mantine/core';

// Nuevo componente para el formulario
export function VehiclePutForm() {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí enviarías los datos a tu backend
    console.log('Nombre:', name);
    console.log('Year:', year);
  };

  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        <Title>Name:</Title>
        </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="year">
        <Title>Year:</Title>
      </label>
      <input
        type="number"
        id="email"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <label htmlFor="price">
        <Title>Price:</Title>
      </label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />
    <Grid>
    <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <Button type="submit">
        Modificar
        </Button>
    </Center>
    </Grid.Col>
    </Grid>     
    </form>
    </Center>
    </Grid.Col>
    </Grid>
</Box>
  );
}

