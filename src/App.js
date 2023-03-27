
import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router";

import Board from './Board';
import oneMove from "./Model";
import Game from './Game';

function App() {


  return (
    <>

      <div>
        <Game/>

      </div>



    </>


  );
}

export default App;
