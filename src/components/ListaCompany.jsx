import React, { useState } from 'react';
import { TextInput, Button, Group, Text, Box, Grid, Center, Title,Image, Stack } from '@mantine/core';
import '@mantine/core/styles.css';
import { Backoffice } from './Backoffice'; // Assuming this is your backoffice component
import Logo from '../imagenes/logo-navbar.png';
import {CompanyList } from './CompanyList';

export const ListCompany = () => {
  function renderCards() {
    return (
      
      <Box>
        <Grid>
          <Grid.Col span={4}>
            <Stack
              justify="center"
              align="flex-start"
            >
              <Group>
              <Backoffice />
            </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={8}>
            <Stack
              justify="center"
              align='flex-start'
              >
            <br /><br /><br />
            <Center><Title>Lista de Empresas</Title></Center>
            <br /><br /><br />
            <Center ><CompanyList /></Center>
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