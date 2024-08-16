import React, { useState } from 'react';
import { TextInput, Button, Group, Text, Box, Grid, Center, Title,Image, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import { Backoffice } from './Backoffice'; // Assuming this is your backoffice component
import Logo from '../imagenes/logo-navbar.png';
import { MotorsList } from './MotorsList';

export const ListMotors = () => {
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
            <Center><Title>Lista de Motores</Title></Center>
            <br /><br /><br />
            <Center ><MotorsList /></Center>
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