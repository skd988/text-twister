import { useState } from 'react'
import './App.css'
import { getWordsArray } from './game'

function App() {
  const [isGameActive, isGameActiveSet] = useState(false);
  const startGame = () => 
  {
    console.log(isGameActive);
    isGameActiveSet(true);
    getWordsArray('words.txt');
  }
  
  return (
    <>
      <button className={isGameActive? "hidden" : ""} onClick={startGame}>CLICK ME</button>
    </>
  )
}

export default App
