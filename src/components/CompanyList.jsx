import { Title, Box, Grid, Stack, Table, Button, Center, Text, Image } from "@mantine/core";
import { getCompanys, deleteCompany} from "../services/Company"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const CompanyList = () => {

    const [company, setCompany] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null); 
    const [selectedCompany, setSelectedCompany] = useState(null);

    const imgStyles = {
      width: "40rem",
      height: "20rem"
    };

    useEffect(() => {
    const fetchCompany = async () => {
      const data = await getCompanys();
      setCompany(data || []);
    };
    fetchCompany();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleDelete = async (companyId) => {
    try {
      await deleteCompany(companyId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setCompany(company.filter((company) => company.id !== companyId));
      close(); // Cierra el modal
      console.log("Company eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el Company:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el company. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = company.map((company) => (
        <Table.Tr key={company.id} >
          <Table.Td>{company.id}</Table.Td>  
          <Table.Td>  {/* Celda para mostrar las imágenes */}
          <Button onClick={() => setSelectedCompany(company)}>Ver Imagen</Button>
          </Table.Td>
          <Table.Td>{company.name}</Table.Td>
          <Table.Td>{company.description}</Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putCompany/${company.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedCompanyId(company.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>

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
              <Title>Eliminar Empresa</Title>
              <Text>¿Está completamente seguro de que desea eliminar esta empresa?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedCompanyId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
            <Modal opened={selectedCompany !== null} onClose={(close) => setSelectedCompanyId(null)}>
          <Center>
            {selectedCompany?.Images?.map((image, index) => (
            <div key={index} 
             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <Image
                    radius={"xl"}
                    src={`data:image/png;base64,${image.base64}`}
                    alt={selectedCompany.name}
                    style={{
                      objectFit: 'contain', // Ajusta la imagen al contenedor sin distorsionar
                      maxWidth: '100%', // Asegura que la imagen no sobrepase el contenedor
                      maxHeight: '100%' // Asegura que la imagen no sobrepase el contenedor
                    }}
                />
            </div>
             
             ))}
           </Center>
           <Center><Button onClick={() => setSelectedCompany(null)}>Volver</Button> </Center>
          </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Imagen de la Empresa</Table.Th>
            <Table.Th>Nombre de la Empresa</Table.Th>
            <Table.Th>Descripion de la Empresa</Table.Th>
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