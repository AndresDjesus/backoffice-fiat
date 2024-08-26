import React, { useState } from 'react';
import { TextInput, Button, Group, Text, Box, Grid, Center, Title,Image, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import { Backoffice } from './Backoffice'; // Assuming this is your backoffice component
import Logo from '../imagenes/logo-navbar.png';
import { VehiculosList } from './VehiculosList';

export const ListVehicle = () => {
  function renderCards() {
    return (
      
      <Box>
        <Grid>
          <Grid.Col span={3}>
            <Stack
              justify="center"
              align="flex-start"
            >
              <Group>
              <Backoffice />
            </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={7}>
            <br /><br /><br />
            <Center><Title>Lista de Vehiculos</Title></Center>
            <br /><br />
            <Center><VehiculosList /></Center>
          </Grid.Col>
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Grid>
        {renderCards()}
      </Grid>
    </Box>
  );
};