import { Title, Box, Grid, Stack, Table, Button, Center, Text } from "@mantine/core";
import { getCategory, deleteCategory} from "../services/Category"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  

import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const CategoryList = () => {

    const [category, setCategory] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); 

    useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategory();
      setCategory(data || []);
    };
    fetchCategory();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setCategory(category.filter((category) => category.id !== categoryId));
      close(); // Cierra el modal
      console.log("Categoria eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la categoria:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar la categoria. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = category.map((category) => (
        <Table.Tr key={category.id} >
          <Table.Td>{category.id}</Table.Td>  
          <Table.Td>{category.name}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putCategory/${category.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedCategoryId(category.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
              <Title>Eliminar Categoria</Title>
              <Text>¿Está completamente seguro de que desea eliminar esta categoria?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedCategoryId)}>
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