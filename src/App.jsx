
import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Queen from './components/Queen/Queen';
import Sudoku from "./components/sudoku/Sudoku";
import Tower from "./components/towerOfHanoi/Tower"

import Learn from "./components/LearnMore/Learn"

function App() {
  
  const [learn , setLearn] = useState(false);
  const [algo , setAlgo] = useState("NQueen");

  return (
    <>

    <Navbar algo={algo} setAlgo ={setAlgo} setLearn={setLearn}></Navbar>

    {learn ? <Learn /> : algo=='NQueen' ? <Queen/>:algo=="Sudoku" ? <Sudoku/>:<Tower/>}

    </>
  )
}

export default App
