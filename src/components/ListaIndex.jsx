import React, { useState } from 'react';
import { TextInput, Button, Group, Text, Box, Grid, Center, Title,Image, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import { Backoffice } from './Backoffice'; // Assuming this is your backoffice component
import Logo from '../imagenes/logo-navbar.png';
import {IndexList } from './IndexList';

export const ListIndex = () => {
  function renderCards() {
    return (
      
      <Box>
        <Grid>
          <Grid.Col span={2}>
            <Stack
              justify="center"
              align="flex-start"
            >
              <Group>
              <Backoffice />
            </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={10}>
            <Stack
              justify="center"
              align='flex-start'
              >
            <br /><br /><br />
            <Center><Title>Lista de la Pagina Principal</Title></Center>
            <br /><br /><br />
            <Center ><IndexList /></Center>
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