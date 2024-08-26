import { Title, Box, Grid, Stack, Table, Button, Center, Text , Image} from "@mantine/core";
import { getDesigns, deleteDesign} from "../services/Design"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const DesignList = () => {

    const [design, setDesign] = useState([]);
    const [selectedDesignId, setSelectedDesignId] = useState(null); 

    const imgStyles = {
      width: "40rem",
      height: "20rem"
  };

    useEffect(() => {
    const fetchDesign = async () => {
      const data = await getDesigns();
      setDesign(data || []);
    };
    fetchDesign();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (designId) => {
    try {
      await deleteDesign(designId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setDesign(design.filter((design) => design.id !== designId));
      close(); // Cierra el modal
      console.log("Design eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el design:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el design. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = design.map((design) => (
        <Table.Tr key={design.id} >
          <Table.Td>{design.id}</Table.Td>  
          <Table.Td>
          <Image styles={imgStyles} radius={"xl"} src={`data:image/png;base64,${design?.Images?.[0]?.base64}`} alt={design.name} />
          <Image styles={imgStyles} radius={"xl"} src={`data:image/png;base64,${design?.Images?.[1]?.base64}`} alt={design.name} />
          <Image styles={imgStyles} radius={"xl"} src={`data:image/png;base64,${design?.Images?.[2]?.base64}`} alt={design.name} />
          <Image styles={imgStyles} radius={"xl"} src={`data:image/png;base64,${design?.Images?.[3]?.base64}`} alt={design.name} />
      </Table.Td>
          <Table.Td>{design.title}</Table.Td>
          <Table.Td>{design.content}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putDesign/${design.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedDesignId(design.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
              <Title>Eliminar Design</Title>
              <Text>¿Está completamente seguro de que desea eliminar este design?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedDesignId)}>
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