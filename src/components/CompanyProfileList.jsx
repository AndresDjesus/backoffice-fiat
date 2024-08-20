import { Title, Box, Grid, Stack, Table, Button, Center, Text } from "@mantine/core";
import { getCompanyProfiles, deleteCompanyProfile} from "../services/CompanyProfile"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const CompanyProfileList = () => {

    const [companyProfile, setCompanyProfile] = useState([]);
    const [selectedCompanyProfileId, setSelectedCompanyProfileId] = useState(null); 

    useEffect(() => {
    const fetchCompanyProfile = async () => {
      const data = await getCompanyProfiles();
      setCompanyProfile(data || []);
    };
    fetchCompanyProfile();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (companyProfileId) => {
    try {
      await deleteCompanyProfile(companyProfileId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setCompanyProfile(companyProfile.filter((companyProfile) => companyProfile.id !== companyProfileId));
      close(); // Cierra el modal
      console.log("Company eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el Company:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el company. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = companyProfile.map((companyProfile) => (
        <Table.Tr key={companyProfile.id} >
          <Table.Td>{companyProfile.id}</Table.Td>  
          <Table.Td>{companyProfile.active}</Table.Td>
          <Table.Td>{companyProfile.misssion}</Table.Td>
          <Table.Td>{companyProfile.vision}</Table.Td>
          <Table.Td>{companyProfile.history}</Table.Td>
          <Table.Td>{companyProfile.schedule}</Table.Td>
          <Table.Td>{companyProfile.company?.name}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putCompany/${companyProfile.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedCompanyProfileId(companyProfile.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
              <Title>Eliminar Perfil</Title>
              <Text>¿Está completamente seguro de que desea eliminar este perfil?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedCompanyProfileId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Estado</Table.Th>
            <Table.Th>Misión</Table.Th>
            <Table.Th>Visión</Table.Th>
            <Table.Th>Historia</Table.Th>
            <Table.Th>Horario</Table.Th>
            <Table.Th>Nombre de la Empresa</Table.Th>
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