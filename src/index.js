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
import {PatchVehicle} from './components/PatchVehicle';
import {DeleteVehicle} from './components/DeleteVehicle';
import {BackofficeCategories} from './components/BackofficeCategories';
import {BackofficeMotor} from './components/BackofficeMotor';
import { ListVehicle } from './components/ListaVehicles';
import {BackofficeCombustible} from './components/BackofficeCombustible';
import {BackofficeInterior} from './components/BackofficeInterior';

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
    path: "/motors",
    element: <BackofficeMotor />,
  },
  {
    path: "/combustible",
    element: <BackofficeCombustible />,
  },
  {
    path: "/interior",
    element: <BackofficeInterior />,
  },


]);

root.render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
