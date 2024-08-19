import { Title, Box, Grid, Stack, Table, Button, Center, Text } from "@mantine/core";
import { getTechnology, deleteTechnology} from "../services/Technology"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const TechnologyList = () => {

    const [technology, setTechnology] = useState([]);
    const [selectedTechnologyId, setSelectedTechnologyId] = useState(null); 

    useEffect(() => {
    const fetchTechnology = async () => {
      const data = await getTechnology();
      setTechnology(data || []);
    };
    fetchTechnology();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (technologyId) => {
    try {
      await deleteTechnology(technologyId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setTechnology(technology.filter((technology) => technology.id !== technologyId));
      close(); // Cierra el modal
      console.log("Tecnologia eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la tecnologia:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar la tecnologia. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = technology.map((technology) => (
        <Table.Tr key={technology.id} >
          <Table.Td>{technology.id}</Table.Td>  
          <Table.Td>{technology.title}</Table.Td>
          <Table.Td>{technology.content}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putTechnology/${technology.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedTechnologyId(technology.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
              <Title>Eliminar Tecnologia</Title>
              <Text>¿Está completamente seguro de que desea eliminar esta Tecnologia?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedTechnologyId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Titulo</Table.Th>
            <Table.Th>Contenido</Table.Th>
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