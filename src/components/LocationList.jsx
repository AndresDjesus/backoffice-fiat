import { Title, Box, Grid, Stack, Table, Button, Center, Text } from "@mantine/core";
import { getLocation, deleteLocation} from "../services/Location"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  

import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const LocationList = () => {

    const [location, setLocation] = useState([]);
    const [selectedLocationId, setSelectedLocationId] = useState(null); 

    useEffect(() => {
    const fetchLocation = async () => {
      const data = await getLocation();
      setLocation(data || []);
    };
    fetchLocation();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (locationId) => {
    try {
      await deleteLocation(locationId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setLocation(location.filter((location) => location.id !== locationId));
      close(); // Cierra el modal
      console.log("Location eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar la location:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar la location. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = location.map((location) => (
        <Table.Tr key={location.id} >
          <Table.Td>{location?.id}</Table.Td>  
          <Table.Td>{location?.address}</Table.Td>
          <Table.Td>{location?.latitude}</Table.Td>
          <Table.Td>{location?.longitude}</Table.Td>
          <Table.Td>{location?.location?.name}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putLocation/${location.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedLocationId(location.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

        </Table.Tr>
      ));
    return (
        
        <Box>
            {/* <Title>Lista de Vehiculos</Title> */}
            <Grid>
                <Grid.Col span={12}>
                    <Stack
                        justify="center"
                        align="center"
                    >
        <Modal
              opened={opened}
              onClose={close}
              fullScreen={isMobile}
              transitionProps={{ transition: 'fade', duration: 200 }}
            >   
              <Title>Eliminar Ubicacion</Title>
              <Text>¿Está completamente seguro de que desea eliminar este ubicación?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedLocationId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Latitude</Table.Th>
            <Table.Th>Longitude</Table.Th>
            <Table.Th>Nombre de la Empresa</Table.Th>
            <Table.Th>Modificar</Table.Th>
            <Table.Th>Eliminar</Table.Th>

            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            </Center>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Box>
    );
}