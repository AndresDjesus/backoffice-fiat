import React, { useState } from 'react';
import { TextInput, Button, Group, Text, Box, Grid, Center, Title,Image, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import { Backoffice } from './Backoffice'; // Assuming this is your backoffice component
import Logo from '../imagenes/logo-navbar.png';
import { CategoryList } from './CategoryList';

export const ListCategory = () => {
  function renderCards() {
    return (
      
      <Box>
        <Grid>
          <Grid.Col span={10}>
            <Stack
              justify="center"
              align="flex-start"
            >
              <Group>
              <Backoffice />
            </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Stack
              justify="center"
              align='flex-start'
              >
            <br /><br /><br />
            <Center><Title>Lista de Categorias de Vehiculos</Title></Center>
            <br /><br /><br />
            <Center ><CategoryList /></Center>
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