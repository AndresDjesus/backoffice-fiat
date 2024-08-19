import React, { useState } from 'react';
import { TextInput, Button, Group, Text, Box, Grid, Center, Title,Image, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import { Backoffice } from './Backoffice'; // Assuming this is your backoffice component
import Logo from '../imagenes/logo-navbar.png';
import {CombustibleList } from './CombustibleList';

export const ListCombustible = () => {
  function renderCards() {
    return (
      
      <Box>
        <Grid>
          <Grid.Col span={6}>
            <Stack
              justify="center"
              align="flex-start"
            >
              <Group>
              <Backoffice />
            </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack
              justify="center"
              align='flex-start'
              >
            <br /><br /><br />
            <Center><Title>Lista de Combustibles para Vehiculos</Title></Center>
            <br /><br /><br />
            <Center ><CombustibleList /></Center>
            </Stack>
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