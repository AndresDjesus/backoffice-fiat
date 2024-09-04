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
import { BackofficeDesign } from "./components/BackofficeDesign";
import { BackofficeTechnology } from "./components/BackofficeTechnology";
import { BackofficeService } from "./components/BackofficeService";
import { BackofficeCompanyProfile} from "./components/BackofficeCompanyProfile"
import { BackofficeCompany } from "./components/BackofficeCompany";
import { BackofficeBlog } from "./components/BackofficeBlog";
import { BackofficeFooter} from "./components/BackofficeFooter";
import { BackofficeIndex } from "./components/BackofficeIndex";
import { BackofficeAdvertising } from "./components/BackofficeAdvertising";
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
      <Route path="/design" element={<BackofficeDesign />} />
      <Route path="/technology" element= {<BackofficeTechnology />} />
      <Route path="/service" element = {<BackofficeService/>} />
      <Route path="/companyProfile" element = {<BackofficeCompanyProfile/>} />
      <Route path="/company" element = {<BackofficeCompany/>} />
      <Route path="/blog" element = {<BackofficeBlog/>} />
      <Route path="/footer" element = {<BackofficeFooter/>} />
      <Route path = '/index' element = {<BackofficeIndex/>} />
      <Route path = '/advertising' element = {<BackofficeAdvertising/>} />
    </Routes>
  );
}

export default App;
