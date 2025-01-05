import './App.css';
import Home from './Components/home';
import Properties from './Components/properties';
import estateData from "./Data/estateData.json";
import { RiHome5Line } from "react-icons/ri";
import { LuBedSingle } from "react-icons/lu";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Route, Routes } from 'react-router-dom';


function App() {

  return(
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/property/:id' element={<Properties/>}/>
    </Routes>

  )
}

export default App;
