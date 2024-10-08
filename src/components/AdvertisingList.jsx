import { Title, Box, Grid, Stack, Table, Button, Center, Text, Image, Modal } from "@mantine/core";
import { getAdvertising, deleteAdvertising } from "../services/Advertising"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';



export const AdvertisingList = () => {

   
    const [advertising, setAdvertising] = useState([]);
    const [selectedAdvertisingId, setSelectedAdvertisingId] = useState(null); 
    const [selectedAdvertising , setSelectedAdvertising] = useState(null);


    const imgStyles = {
      width: "40rem",
      height: "20rem"
  }

    useEffect(() => {
    const fetchAdvertising = async () => {
      const data = await getAdvertising();
      setAdvertising(data || []);
    };
    fetchAdvertising();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (advertisingId) => {
    try {
      await deleteAdvertising(advertisingId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setAdvertising(advertising.filter((advertising) => advertising.id !== advertisingId));
      close(); // Cierra el modal
      console.log("Advertising eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el advertising:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el advertising. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = advertising.map((advertising) => (
        <Table.Tr key={advertising.id} >
          <Table.Td>{advertising.id}</Table.Td>  
          <Table.Td>  {/* Celda para mostrar las imágenes */}
          <Button onClick={() => setSelectedAdvertising(advertising)}>Ver Imagenes</Button>
          </Table.Td>
          <Table.Td>{advertising.name}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putAdvertising/${advertising.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedAdvertisingId(advertising.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
              <Title>Eliminar Publicidad</Title>
              <Text>¿Está completamente seguro de que desea eliminar esta Publicidad?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedAdvertisingId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
            <Modal opened={selectedAdvertising !== null} onClose={(close) => setSelectedAdvertisingId(null)}>
          <Center>
            {selectedAdvertising?.Images?.map((image, index) => (
            <div key={index} 
             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <Image
                    src={`data:image/png;base64,${image.base64}`}
                    alt={selectedAdvertising.title}
                    style={{
                      objectFit: 'contain', 
                      maxWidth: '100%', 
                      maxHeight: '100%' 
                    }}
                />
            </div>
             
             ))}
           </Center>
           <Center><Button onClick={() => setSelectedAdvertising(null)}>Volver</Button> </Center>
          </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Imagen</Table.Th>
            <Table.Th>Titulo</Table.Th>
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