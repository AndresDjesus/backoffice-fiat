import React, { useState } from 'react';
import { TextInput, Button, Group, Text, Box, Grid, Center, Title,Image } from '@mantine/core';
import { FormPutMotors } from './formPutMotors'; // Assuming this is your form component
import { Backoffice } from './Backoffice'; // Assuming this is your backoffice component
import Logo from '../imagenes/logo-navbar.png';

export const PutMotor = () => {
  function renderCards() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid gutter="xl" style={{ maxWidth: '80%' }}>  {/* Add gutter for spacing */}
          <Grid.Col span={6} > {/* Backoffice component takes 6 columns */}
            <Box p={'0.5rem'}>
            <Backoffice />
            </Box>
          </Grid.Col>
          <Grid.Col span={6}> {/* FormVehicles component takes 6 columns */}
          <br /><br /><br /> 


            <Center >
                <Box p="xl" sx={{ display: 'flex', alignItems: 'center' }}>
                <FormPutMotors />
                </Box>
            </Center>
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