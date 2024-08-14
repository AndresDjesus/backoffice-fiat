import { Title, Box, Grid, Stack, Table, Button } from "@mantine/core";
import {getVehicles} from '../services/Vehicles' 
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


export const VehiculosList = () => {

    const [vehicles , setVehicles] = useState([]);
    useEffect(() => {
        const fetchVehicles = async () => {
            const data = await getVehicles();
            setVehicles(data || []);
        };
        fetchVehicles();
    }, []);
    const rows = vehicles.map((vehicles) => (
        <Table.Tr key={vehicles.name}>
          <Table.Td>{vehicles.id}</Table.Td>  
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
          <Table.Td><Button><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
                        <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
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
                    </Stack>
                </Grid.Col>
            </Grid>
        </Box>
    );
}