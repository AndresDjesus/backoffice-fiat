import { Box, Grid, Image, Text, Title , NavLink} from "@mantine/core"
import { IconGauge, IconFingerprint } from "@tabler/icons-react";
import Logo from '../imagenes/logo-navbar.png';
import React from "react";
export const Backoffice = () => {
  
    const imgStyles = {
        width: "20rem",
        height: "10rem"
    }
    function renderCards(){
    return(
    
    <Box>
        <Grid>
        <Grid.Col c={'blue'} span={{ span:15, md:15}}>
    <>
    <Image style={imgStyles} src={Logo}/>
    <NavLink 
      href="#"
      label= "Vehiculos"
      leftSection={<IconGauge size="1rem" stroke={1.5} />}
    >
      <NavLink href="/listVehicles" label= "Lista de Vehiculos" />
      <NavLink href="/vehiculos" label= "Crear Vehiculos" />
    </NavLink>

    <NavLink 
    href="#"
    label = "Imagenes"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Imagenes de Vehiculos" childrenOffset={28} href="#">
        <NavLink label = "First child link" href="#" />
        <NavLink label = "Second child link" href="#" />
        <NavLink label  = "Third child link" href="#" />
      </NavLink>
      <NavLink label = "Imagenes de Servicos" childrenOffset={28} href="#">
        <NavLink label = "First child link" href="#" />
        <NavLink label = "Second child link" href="#" />
        <NavLink label  = "Third child link" href="#" />
      </NavLink>
      <NavLink label = "Imagenes del Blog" childrenOffset={28} href="#">
        <NavLink label = "First child link" href="#" />
        <NavLink label = "Second child link" href="#" />
        <NavLink label  = "Third child link" href="#" />
      </NavLink>
      <NavLink label = "Imagen de la Empresa" childrenOffset={28} href="#">
        <NavLink label = "First child link" href="#" />
        <NavLink label = "Second child link" href="#" />
        <NavLink label  = "Third child link" href="#" />
      </NavLink>
      <NavLink label = "Imagen del Footer" childrenOffset={28} href="#">
        <NavLink label = "First child link" href="#" />
        <NavLink label = "Second child link" href="#" />
        <NavLink label  = "Third child link" href="#" />
      </NavLink>
    </NavLink>    

    <NavLink 
    href="#"
    label = "Categorias"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Crear Categoria" href="/categories" />
        <NavLink label = "Modificar Categoria Totalmente" href="/putCategories"/>
        <NavLink label = "Modificar Categoria Parcialmente" href="/patchCategory" />
        <NavLink label = "Eliminar Categoria" href="/deleteCategory" />
    </NavLink>    

    <NavLink 
    href="#"
    label = "Motores"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Crear Motor" href="/motors" />
        <NavLink label = "Modificar Motor Totalmente" href="/putMotors" />
        <NavLink label = "Modificar Motor Parcialmente" href="/patchMotor" />
        <NavLink label = "Eliminar Motor" href="/deleteMotor" />
    </NavLink>    
    <NavLink 
    href="#"
    label = "Interior"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Crear Interior" href="/interior" />
        <NavLink label = "Modificar Interior Totalmente" href="/putInterior" />
        <NavLink label = "Modificar Interior Parcialmente" href="/patchInterior" />
        <NavLink label = "Eliminar Interior" href="/deleteInterior" />
    </NavLink>    
    <NavLink 
    href="#"
    label = "Design"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Crear Design" href="/design" />
        <NavLink label = "Modificar Design Totalmente" href="/putDesign" />
        <NavLink label = "Modificar Design Parcialmente" href="/patchDesign" />
        <NavLink label = "Eliminar Design" href="/deleteDesign" />
    </NavLink>   
    <NavLink 
    href="#"
    label = "Technology"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Crear Technology" href="/technology" />
        <NavLink label = "Modificar technology Totalmente" href="/putTechnology" />
        <NavLink label = "Modificar technology Parcialmente" href="/patchTechnology" />
        <NavLink label = "Eliminar Technology" href="/deleteTechnology" />
    </NavLink>     
    <NavLink 
    href="#"
    label = "Combustibles"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Crear Combustible" href="/combustible" />
        <NavLink label = "Modificar combustible Totalmente" href="/putCombustible" />
        <NavLink label = "Modificar combustible Parcialmente" href="/patchCombustible" />
        <NavLink label = "Eliminar combustible" href="/deleteCombustible" />
    </NavLink>    
    </>
        </Grid.Col>
    </Grid>
    </Box>
  );
}
    return (
        <Box>
            <Grid>
                {renderCards()}         
            </Grid>
        </Box>
    )
}
