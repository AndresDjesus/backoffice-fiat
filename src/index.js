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
    path: "/putVehicles",
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
]);

root.render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
