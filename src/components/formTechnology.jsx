import { Box, Grid, TextInput, Button, Text, Title, Center, Image } from "@mantine/core";
import {TechnologyForm} from "./TechnologyForm";
import logo from '../imagenes/logo-navbar.png';
export const FormTechnology = () => {
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
            <Title size={'4rem'}> CREAR TECNOLOGIA</Title>
            <br /><br />
            <Image p= "1rem" style={imgStyles} src="https://fotos.perfil.com//2024/02/28/900/0/fiat-strada-2024-1762173.jpg"/>
          <TechnologyForm/>  { }
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