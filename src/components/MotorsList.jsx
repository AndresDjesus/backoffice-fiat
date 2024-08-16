import { Title, Box, Grid, Stack, Table, Button, Center, Text } from "@mantine/core";
import { getMotors, deleteMotor} from "../services/Motors"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  

import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const MotorsList = () => {

    const [motors, setMotors] = useState([]);
    const [selectedMotorId, setSelectedMotorId] = useState(null); 

    useEffect(() => {
    const fetchMotors = async () => {
      const data = await getMotors();
      setMotors(data || []);
    };
    fetchMotors();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (motorId) => {
    try {
      await deleteMotor(motorId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setMotors(motors.filter((motors) => motors.id !== motorId));
      close(); // Cierra el modal
      console.log("Motor eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el motor:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el motor. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = motors.map((motors) => (
        <Table.Tr key={motors.id} >
          <Table.Td>{motors.id}</Table.Td>  
          <Table.Td>{motors.name}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putMotor/${motors.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedMotorId(motors.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
              <Title>Eliminar Motor</Title>
              <Text>¿Está completamente seguro de que desea eliminar este motor?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedMotorId)}>
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