import { Box, Grid, TextInput, Button, Text, Title, Center, Image } from "@mantine/core";
import { ServicePutForm } from "./ServicePutForm";
import logo from '../imagenes/logo-navbar.png';
export const FormPutService = () => {
    function renderCards() {
        const imgStyles = {
            width: "60rem",
            height: "40rem"
        }
        return (
        
      <Box>
        <Grid span={{ span:12, md:12}}>
        <Grid.Col p={'10rem'}>
        <Center>
            <Title size={'4rem'}> MODIFICAR SERVICIO</Title>
            <br /><br />
            <Image p= "1rem" style={imgStyles} src="https://fotos.perfil.com//2024/02/28/900/0/fiat-strada-2024-1762173.jpg"/>
          <ServicePutForm />  { }
          </Center>
        </Grid.Col> 
        </Grid>
      </Box>
    )
  }

  return (
    <Box>
      <Grid>
        {renderCards()}         
      </Grid>
    </Box>
  )
}