import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Backoffice } from './components/Backoffice';
import { BackofficeVehicles } from "./components/BackofficeVehicles";
import { PutVehicle } from "./components/PutVehicle";
import { PatchVehicle } from "./components/PatchVehicle";
import { DeleteVehicle } from "./components/DeleteVehicle";
import { BackofficeCategories } from "./components/BackofficeCategories";
import { BackofficeMotor } from "./components/BackofficeMotor";
import {BackofficeCombustible} from "./components/BackofficeCombustible";
import { BackofficeInterior } from "./components/BackofficeInterior";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Backoffice />} />
      <Route path="/vehiculos" element={<BackofficeVehicles />} />
      <Route path="/putVehicles" element={<PutVehicle />} />
      <Route path="/patchVehicle" element={<PatchVehicle />} />
      <Route path="/deleteVehicle" element={<DeleteVehicle />} />
      <Route path="/categories" element={<BackofficeCategories />} />
      <Route path="/motors" element={<BackofficeMotor />} />
      <Route path="/combustible" element={<BackofficeCombustible />} />
      <Route path="/interior" element={<BackofficeInterior />} />
    </Routes>
  );
}

export default App;
