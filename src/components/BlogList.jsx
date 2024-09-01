import { Title, Box, Grid, Stack, Table, Button, Center, Text , Image} from "@mantine/core";
import { getBlog, deleteBlog} from "../services/Blog"; // Import deleteVehicle function
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';  
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { format } from 'date-fns';
export const BlogList = () => {


    const [blog, setBlog] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState(null); 
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
    const fetchBlog = async () => {
      const data = await getBlog();
      setBlog(data || []);
    };
    fetchBlog();
  }, []);

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const imgStyles = {
    width: "40rem",
    height: "20rem"
  };

  const formattedDate = format(blog?.date ? new Date(blog?.date) : new Date(), 'dd/MM/yyyy');

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId); // Llama a la función de eliminación
      // Actualiza el estado local de los vehículos
      setBlog(blog.filter((blog) => blog.id !== blogId));
      close(); // Cierra el modal
      console.log("Post eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el Post:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al eliminar el post. Por favor, inténtalo de nuevo más tarde.");
    }
  };

    const rows = blog.map((blog) => (
        <Table.Tr key={blog.id} >
          <Table.Td>{blog.id}</Table.Td>
          <Table.Td>  {/* Celda para mostrar las imágenes */}
          <Button onClick={() => setSelectedBlog(blog)}>Ver Imagen</Button>
          </Table.Td>
          <Table.Td>{blog.title}</Table.Td>
          <Table.Td>{blog.description}</Table.Td>
          <Table.Td>{blog.content}</Table.Td>
          <Table.Td>
            {formattedDate}
          </Table.Td>
          <Table.Td><Button onClick={() => navigate(`/putBlog/${blog.id}`)}><FontAwesomeIcon icon={faPencilAlt} /></Button></Table.Td>
          <Table.Td><Button onClick={() => { setSelectedBlogId(blog.id); open(); }}><FontAwesomeIcon icon={faTrash} /></Button></Table.Td>
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
              <Title>Eliminar Blog</Title>
              <Text>¿Está completamente seguro de que desea eliminar este post?</Text>
              <Stack spacing="sm" mt="md">
                <Button variant="outline" onClick={close}>
                  Cancelar
                </Button>
                <Button onClick={() => handleDelete(selectedBlogId)}>
                  Eliminar
                </Button>
              </Stack>
            </Modal>
            <Modal opened={selectedBlog !== null} onClose={(close) => setSelectedBlogId(null)}>
          <Center>
            {selectedBlog?.Images?.map((image, index) => (
            <div key={index} 
             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <Image
                    radius={"xl"}
                    src={`data:image/png;base64,${image.base64}`}
                    alt={selectedBlog.name}
                    style={{
                      objectFit: 'contain', // Ajusta la imagen al contenedor sin distorsionar
                      maxWidth: '100%', // Asegura que la imagen no sobrepase el contenedor
                      maxHeight: '100%' // Asegura que la imagen no sobrepase el contenedor
                    }}
                />
            </div>
             
             ))}
           </Center>
           <Center><Button onClick={() => setSelectedBlog(null)}>Volver</Button> </Center>
          </Modal>
        <Center>
         <Table>
        <Table.Thead>
            <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Imagen del Post</Table.Th>
            <Table.Th>Titulo</Table.Th>
            <Table.Th>Descripción</Table.Th>
            <Table.Th>Contenido</Table.Th>
            <Table.Th>Fecha</Table.Th>
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