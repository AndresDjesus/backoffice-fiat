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
import {BackofficeInterior} from './components/BackofficeInterior';
import { ListCategory } from './components/ListaCategory';
import { ListMotors } from './components/ListaMotors';

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
