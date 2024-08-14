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
          <Grid.Col span={12}>
            <Stack
              justify="center"
              align="flex-start"
            >
              <Group>
              <Backoffice />
              <Title>Lista de Vehiculos</Title>
              <VehiculosList />
            </Group>
            </Stack>
          </Grid.Col>
          {/* <Grid.Col>
            <VehiculosList />
          </Grid.Col> */}

          {/* <Grid.Col span={12}>  */}
          {/* </Grid.Col>           */}
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