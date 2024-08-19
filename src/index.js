import { MantineProvider, MantineThemeProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import React from 'react';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Backoffice} from './components/Backoffice';
import {BackofficeVehicles} from './components/BackofficeVehicles';
import {PutVehicle} from './components/PutVehicle';
import { PutCategory } from './components/PutCategory';
import {PatchVehicle} from './components/PatchVehicle';
import {DeleteVehicle} from './components/DeleteVehicle';
import {BackofficeCategories} from './components/BackofficeCategories';
import {BackofficeMotor} from './components/BackofficeMotor';
import { ListVehicle } from './components/ListaVehicles';
import {BackofficeCombustible} from './components/BackofficeCombustible';
import { ListCombustible} from './components/ListaCombustible';
import { PutCombustible } from './components/PutCombustible';
import {BackofficeInterior} from './components/BackofficeInterior';
import { ListCategory } from './components/ListaCategory';
import { ListInside } from './components/ListaInteriores';
import { ListMotors } from './components/ListaMotors';
import { PutMotor } from './components/PutMotors';
import { PutInside} from './components/PutInside';
import { BackofficeDesign } from './components/BackofficeDesign';
import { ListDesign} from './components/ListaDesign'
import { PutDesign } from './components/PutDesign';
import { BackofficeTechnology } from './components/BackofficeTechnology';
import { ListTechnology} from './components/ListaTechnology';
import { PutTechnology } from './components/PutTechnology';
import { BackofficeService } from './components/BackofficeService';
import { ListService} from './components/ListaService';
import { PutService } from './components/PutService';
import { BackofficeCompanyProfile } from './components/BackofficeCompanyProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([

  {
    path: "/",
    element: <Backoffice />,
  },
  {
    path: "/vehiculos",
    element: <BackofficeVehicles />,
  },
  {
    path: "/putVehicles/:id",
    element: <PutVehicle />,
  },
  {
    path: "/patchVehicle",
    element: <PatchVehicle />,
  },
  {
    path: "/deleteVehicle",
    element: <DeleteVehicle />,
  },
  {
    path: "/listVehicles",
    element: <ListVehicle />,
  },
  {
    path: "/categories",
    element: <BackofficeCategories />,
  },
  {
    path: "/listCategories",
    element: <ListCategory />,
  },
  {
    path: "/putCategory/:id",
    element: <PutCategory />,
  },
  {
    path: "/motors",
    element: <BackofficeMotor />,
  },
  {
    path: "/listMotors",
    element: <ListMotors />,
  },
  {
    path: "/putMotor/:id",
    element: <PutMotor />,
  },
  {
    path: "/combustible",
    element: <BackofficeCombustible />,
  },
  {
    path: "/listCombustible",
    element: <ListCombustible/>
  },
  {
    path: "/putCombustible/:id",
    element: <PutCombustible/>
  },
  {
    path: "/interior",
    element: <BackofficeInterior />,
  },
  {
    path: "/listInside",
    element: <ListInside />,
  },
  {
    path: "/putInside/:id",
    element: <PutInside />,
  },
  {
    path: "/design",
    element: <BackofficeDesign />
  },
  {
    path: "/listDesign",
    element: <ListDesign />
  },
  {
    path : "/putDesign/:id",
    element: <PutDesign />
  },
  {
    path : "/technology",
    element: <BackofficeTechnology/>
  },
  {
    path : "/listTechnology",
    element: <ListTechnology/>
  },
  {
    path: "/putTechnology/:id",
    element: <PutTechnology/>
  },
  {
    path: "/service",
    element: <BackofficeService/>
  },
  {
    path: "/listService",
    element: <ListService/>
  },
  {
    path: "/putService/:id",
    element: <PutService/>
  },
  {
    path: "/companyProfile",
    element: <BackofficeCompanyProfile/>
  },



]);

root.render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
