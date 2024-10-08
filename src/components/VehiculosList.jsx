import { Title, Box, Grid, Stack, Table, Button, Center, Text, Image } from "@mantine/core";
import { getVehicles, deleteVehicles} from "../services/Vehicles"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  

import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const VehiculosList = () => {

    const [vehicles , setVehicles] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null); 
    const [selectedVehicle, setSelectedVehicle] = useState(null);


    const imgStyles = {
      width: "100%",
      height: "auto"
    };

    useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getVehicles();
      setVehicles(data || []);
    };
    fetchVehicles();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (vehicleId) => {
    try {
      await deleteVehicles(vehicleId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleId));
      close(); // Cierra el modal
      console.log("Vehículo eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el vehículo. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = vehicles.map((vehicles) => (
        <Table.Tr key={vehicles.id}>
          <Table.Td>{vehicles.id}</Table.Td>  
          <Table.Td>
       
        <Button onClick={() => setSelectedVehicle(vehicles)}>Ver Imagenes</Button>
         </Table.Td>
          <Table.Td>{vehicles.year}</Table.Td>
          <Table.Td>{vehicles.name}</Table.Td>
          <Table.Td>{vehicles.price}</Table.Td>
          <Table.Td>{vehicles.transmission}</Table.Td>
          <Table.Td>{vehicles.description}</Table.Td>
          <Table.Td>{vehicles.screen}</Table.Td>
          <Table.Td>{vehicles?.category?.name}</Table.Td>
          <Table.Td>{vehicles?.motor?.name}</Table.Td>
          <Table.Td>{vehicles?.inside?.title}</Table.Td>
          <Table.Td>{vehicles?.design?.title}</Table.Td>
          <Table.Td>{vehicles?.technology?.title}</Table.Td>
          <Table.Td>{vehicles?.combustible?.name}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putVehicles/${vehicles.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedVehicleId(vehicles.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
              <Title>Eliminar Vehiculo</Title>
              <Text>¿Está completamente seguro de que desea eliminar este vehículo?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedVehicleId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
            <Modal opened={selectedVehicle !== null} onClose={(close)}>
          <Center>
            {selectedVehicle?.Images?.map((image, index) => (
            <div key={index} 
             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <Image
                    radius={"xl"}
                    src={`data:image/png;base64,${image.base64}`}
                    alt={selectedVehicle.name}
                    style={{
                      objectFit: 'contain', // Ajusta la imagen al contenedor sin distorsionar
                      maxWidth: '100%', // Asegura que la imagen no sobrepase el contenedor
                      maxHeight: '100%' // Asegura que la imagen no sobrepase el contenedor
                    }}
                />
            </div>
             
             ))}
           </Center>
           <Center><Button onClick={() => setSelectedVehicle(null)}>Volver</Button> </Center>
          </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Imagenes</Table.Th>
            <Table.Th>Year</Table.Th>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Precio</Table.Th>
            <Table.Th>Transmision</Table.Th>
            <Table.Th>Descripcion</Table.Th>
            <Table.Th>Pantalla</Table.Th>
            <Table.Th>Categoria</Table.Th>
            <Table.Th>Motor</Table.Th>
            <Table.Th>Interior</Table.Th>
            <Table.Th>Diseno</Table.Th>
            <Table.Th>Tecnologia</Table.Th>
            <Table.Th>Combustible</Table.Th>
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