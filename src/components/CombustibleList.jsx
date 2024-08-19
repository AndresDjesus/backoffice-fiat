import { Title, Box, Grid, Stack, Table, Button, Center, Text } from "@mantine/core";
import { getCombustible, deleteCombustible} from "../services/Combustible"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const CombustibleList = () => {

    const [combustible, setCombustible] = useState([]);
    const [selectedCombustibleId, setSelectedCombustibleId] = useState(null); 

    useEffect(() => {
    const fetchCombustible = async () => {
      const data = await getCombustible();
      setCombustible(data || []);
    };
    fetchCombustible();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (combustibleId) => {
    try {
      await deleteCombustible(combustibleId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setCombustible(combustible.filter((combustible) => combustible.id !== combustibleId));
      close(); // Cierra el modal
      console.log("Combustible eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el combustible:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el combustible. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = combustible.map((combustible) => (
        <Table.Tr key={combustible.id} >
          <Table.Td>{combustible.id}</Table.Td>  
          <Table.Td>{combustible.name}</Table.Td>
          <Table.Td>{combustible.carretera}</Table.Td>
          <Table.Td>{combustible.ciudad}</Table.Td>
          <Table.Td>{combustible.description}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putCombustible/${combustible.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedCombustibleId(combustible.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
              <Title>Eliminar Combustible</Title>
              <Text>¿Está completamente seguro de que desea eliminar este combustible?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedCombustibleId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Rendimiento en Carretera</Table.Th>
            <Table.Th>Rendimiento en Ciudad</Table.Th>
            <Table.Th>Descripcion</Table.Th>
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