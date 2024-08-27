import { Title, Box, Grid, Stack, Table, Button, Center, Text , Image} from "@mantine/core";
import { getServices, deleteService} from "../services/Service"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const ServiceList = () => {

    const [service, setService] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState(null); 

    const imgStyles = {
      width: "40rem",
      height: "20rem"
    };

    useEffect(() => {
    const fetchService = async () => {
      const data = await getServices();
      setService(data || []);
    };
    fetchService();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setService(service.filter((service) => service.id !== serviceId));
      close(); // Cierra el modal
      console.log("Servicio eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el servicio. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = service.map((service) => (
        <Table.Tr key={service.id} >
          <Table.Td>{service.id}</Table.Td>  
          <Table.Td>  {/* Celda para mostrar las imágenes */}
          {service?.Images?.map((image, index) => (
          <Image key={index} styles={imgStyles} radius={"xl"} 
               src={`data:image/png;base64,${image.base64}`} alt={service.name} />
          ))}
          </Table.Td>
          <Table.Td>{service.name}</Table.Td>
          <Table.Td>{service.description}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putService/${service.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedServiceId(service.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

        </Table.Tr>
      ));
    return (
        
        <Box>
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
              <Title>Eliminar Servicio</Title>
              <Text>¿Está completamente seguro de que desea eliminar este servicio?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedServiceId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Imagen</Table.Th>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Descripcion</Table.Th>
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