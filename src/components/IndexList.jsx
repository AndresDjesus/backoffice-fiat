import { Title, Box, Grid, Stack, Table, Button, Center, Text , Image } from "@mantine/core";
import { getIndex, deleteIndex} from "../services/Index"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const IndexList = () => {

    const [index, setIndex] = useState([]);
    const [selectedIndexId, setSelectedIndexId] = useState(null); 

    const imgStyles = {
      width: "20rem",
      height: "15rem"
    };

    useEffect(() => {
    const fetchIndex = async () => {
      const data = await getIndex();
      setIndex(data || []);
    };
    fetchIndex();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (indexId) => {
    try {
      await deleteIndex(indexId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setIndex(index.filter((index) => index.id !== indexId));
      close(); // Cierra el modal
      console.log("Index eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el Index:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el Index. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = index.map((index) => (
        <Table.Tr key={index.id} >
          <Table.Td>{index.id}</Table.Td>  
          <Table.Td>  {/* Celda para mostrar las imágenes */}
          {index?.Images?.map((image, index) => (
          <Image key={index} styles={imgStyles} radius={"xl"} 
               src={`data:image/png;base64,${image.base64}`} alt={index.title} />
          ))}
          </Table.Td>
          <Table.Td>{index.title}</Table.Td>
          <Table.Td>{index.content}</Table.Td>
          <Table.Td>{index.buyVehicletitle}</Table.Td>
          <Table.Td>{index.buyVehiclecontent }</Table.Td>
          <Table.Td>{index.WhiWe }</Table.Td>
          <Table.Td>{index.LookingforVehicle }</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putIndex/${index.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedIndexId(index.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>
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
              <Title>Eliminar Pagina</Title>
              <Text>¿Está completamente seguro de que desea eliminar esta pagina?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedIndexId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Imagenes</Table.Th>
            <Table.Th>Titulo</Table.Th>
            <Table.Th>Contenido</Table.Th>
            <Table.Th>Compra tu Vehiculo (Titulo)</Table.Th>
            <Table.Th>Compra tu Vehiculo (Contenido)</Table.Th>
            <Table.Th>Por que nosotros?</Table.Th>
            <Table.Th>Buscando tu Vehiculo Ideal</Table.Th>
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