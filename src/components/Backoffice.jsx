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
    
    <Box bg={'black'}>
        <Grid>
        <Grid.Col  bg={'black'}  c={'blue'} span={{ span:15, md:15}}>
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
    label = "Categorias"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Crear Categoria" href="/categories" />
        <NavLink label = "Lista de Categorias" href="/listCategories"/>
    </NavLink>    

    <NavLink 
    href="#"
    label = "Motores"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
         <NavLink label = "Lista de Motores" href="/listMotors" />
        <NavLink label = "Crear Motor" href="/motors" />
    </NavLink>    
    <NavLink 
    href="#"
    label = "Interior"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de Interiores" href="/listInside" />
        <NavLink label = "Crear Interior" href="/interior" />
    </NavLink>    
    <NavLink 
    href="#"
    label = "Design"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de Disenos" href="/listDesign" />
        <NavLink label = "Crear Design" href="/design" />
    </NavLink>   
    <NavLink 
    href="#"
    label = "Technology"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de Tecnologias" href="/listTechnology" />
        <NavLink label = "Crear Technology" href="/technology" />
    </NavLink>     
    <NavLink 
    href="#"
    label = "Combustibles"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
         <NavLink label = "Lista de combustibles" href="/listCombustible" />
        <NavLink label = "Crear Combustible" href="/combustible" />
    </NavLink>   
    <NavLink 
    href="#"
    label = "Servicios"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de Servicios" href="/listService" />
        <NavLink label = "Crear Servicio" href="/service" />
    </NavLink>    
    <NavLink 
    href="#"
    label = "Perfil de la Empresa"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de Perfiles de la Empresa" href="/listCompanyProfile" />
        <NavLink label = "Crear Perfil de la Empresa" href="/companyProfile" />
    </NavLink>    
    <NavLink 
    href="#"
    label = "Empresa"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de Empresas" href="/listCompany" />
        <NavLink label = "Crear Empresa" href="/company" />
    </NavLink>  
    <NavLink 
    href="#"
    label = "Blog"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de Posts del Blog" href="/listBlog" />
        <NavLink label = "Crear Post" href="/blog" />
    </NavLink>  
    <NavLink 
    href="#"
    label = "Pie de Pagina"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de los Pie de Pagina" href="/listFooter" />
        <NavLink label = "Crear Pie de Pagina" href="/footer" />
    </NavLink>  
    <NavLink 
    href="#"
    label = "Pagina Pricipal"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de la Pagina" href="/listIndex" />
        <NavLink label = "Crear Pagina Principal" href="/index" />
    </NavLink>
    {/* <NavLink 
    href="#"
    label = "Ubicacion"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de Ubicaciones" href="/listLocation" />
        <NavLink label = "Crear Ubicacion" href="/location" />
    </NavLink>     */}
    <NavLink 
    href="#"
    label = "Publicidad"
    leftSection = {<IconFingerprint size= "1rem" stroke={1.5} />}
    childrenOffset={28}
    defaultOpened
    >
        <NavLink label = "Lista de Publicidades" href="/listAdvertising" />
        <NavLink label = "Crear Publicidad" href="/advertising" />
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
