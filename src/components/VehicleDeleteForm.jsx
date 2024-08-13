import React, { useState } from 'react';
import { Box, Grid, TextInput, Button , Text, Title, Center} from '@mantine/core';

// Nuevo componente para el formulario
export function VehicleDeleteForm() {
  const [id, setId] = useState('');
 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí enviarías los datos a tu backend
    
  };

  return (
    <Box>
        <Grid>
            <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        <Title>Indice del Vehiculo</Title>
        </label>
      <input
        type="number"
        id="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <br /><br />
    <Grid>
    <Grid.Col c={'blue'} span={{ span:12, md:12}}>
    <Center>
    <Button type="submit">
        Eliminar
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

