import { useState } from 'react'
import './App.css'
import { readWordsArray, getGameWords } from './game'

function App() {
  const [isGameActive, isGameActiveSet] = useState(false);
  const startGame = () => 
  {
    console.log(isGameActive);
    isGameActiveSet(true);
    words = readWordsArray('words.txt').then(words =>
    {
      console.log(getGameWords(words));
    });
  }
  
  return (
    <>
      <button className={isGameActive? "hidden" : ""} onClick={startGame}>CLICK ME</button>
    </>
  )
}

export default App;
