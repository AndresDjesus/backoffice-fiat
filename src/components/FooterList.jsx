import { Title, Box, Grid, Stack, Table, Button, Center, Text } from "@mantine/core";
import { getFooter, deleteFooter} from "../services/Footer"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  

import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const FooterList = () => {

    const [footer, setFooter] = useState([]);
    const [selectedFooterId, setSelectedFooterId] = useState(null); 

    useEffect(() => {
    const fetchFooter = async () => {
      const data = await getFooter();
      setFooter(data || []);
    };
    fetchFooter();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (footerId) => {
    try {
      await deleteFooter(footerId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setFooter(footer.filter((footer) => footer.id !== footerId));
      close(); // Cierra el modal
      console.log("Footer eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el footer:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el footer. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = footer.map((footer) => (
        <Table.Tr key={footer.id} >
          <Table.Td>{footer.id}</Table.Td>  
          <Table.Td>{footer.address}</Table.Td>
          <Table.Td>{footer.email}</Table.Td>
          <Table.Td>{footer.phone}</Table.Td>
          <Table.Td>{footer.social_networks?.gmail?.username}</Table.Td>
          <Table.Td>{footer.social_networks?.gmail?.url}</Table.Td>
         <Table.Td>{footer.social_networks?.instagram?.username}</Table.Td>
         <Table.Td>{footer.social_networks?.instagram?.url}</Table.Td>
        <Table.Td>{footer.social_networks?.whatsapp?.number}</Table.Td>
        <Table.Td>{footer.social_networks?.whatsapp?.url}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putfooter/${footer.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedFooterId(footer.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>
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
              <Title>Eliminar Pie de Pagina</Title>
              <Text>¿Está completamente seguro de que desea eliminar este Pie de Pagina?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedFooterId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Dirección</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Telefono</Table.Th>
            <Table.Th>Gmail</Table.Th>
            <Table.Th>Url</Table.Th>
            <Table.Th>Instagram</Table.Th>
            <Table.Th>Url</Table.Th>
            <Table.Th>Whatsapp</Table.Th>
            <Table.Th>Url</Table.Th>
            <Table.Th>Editar</Table.Th>
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