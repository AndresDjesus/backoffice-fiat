import { Title, Box, Grid, Stack, Table, Button, Center, Text,  Image } from "@mantine/core";
import { getInsides, deleteInside} from "../services/Inside"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const InsideList = () => {

    const [inside, setInside] = useState([]);
    const [selectedInsideId, setSelectedInsideId] = useState(null); 

    const imgStyles = {
      width: "40rem",
      height: "20rem"
    };

    useEffect(() => {
    const fetchInside = async () => {
      const data = await getInsides();
      setInside(data || []);
    };
    fetchInside();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (insideId) => {
    try {
      await deleteInside(insideId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setInside(inside.filter((inside) => inside.id !== insideId));
      close(); // Cierra el modal
      console.log("Interior eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el interior:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar la categoria. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = inside.map((inside) => (
        <Table.Tr key={inside.id} >
          <Table.Td>{inside.id}</Table.Td>  
          <Table.Td>
          <Image styles={imgStyles} radius={"xl"} src={`data:image/png;base64,${inside?.Images?.[0]?.base64}`} alt={inside.name} />
          <Image styles={imgStyles} radius={"xl"} src={`data:image/png;base64,${inside?.Images?.[1]?.base64}`} alt={inside.name} />
          <Image styles={imgStyles} radius={"xl"} src={`data:image/png;base64,${inside?.Images?.[2]?.base64}`} alt={inside.name} />
          <Image styles={imgStyles} radius={"xl"} src={`data:image/png;base64,${inside?.Images?.[3]?.base64}`} alt={inside.name} />
      </Table.Td>
          <Table.Td>{inside.title}</Table.Td>
          <Table.Td>{inside.content}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putInside/${inside.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedInsideId(inside.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
                <Button onClick={() => handleDelete(selectedInsideId)}>
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