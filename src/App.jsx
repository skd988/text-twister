import { useState } from 'react'
import './App.css'
import { readWordsArray, getGameWords } from './game'
import { Words } from './Words'

function App() {
  const submitWord = () =>
  {
    const newWords = [...words];
    const found = newWords.find(word => word['word'] === inputWord);
    if (found !== undefined)
      found['found'] = true;
    else
      console.log('Not a word!')
    setWords(newWords);
  };
  const [words, setWords] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [letters, setLetters] = useState([]);
  const [inputWord, setInputWord] = useState('');
  const startGame = () => 
  {
    readWordsArray('words.txt').then(wordsRead =>
    {
      const wordsObj = getGameWords(wordsRead);
      setWords(wordsObj['words']);
      setLetters(wordsObj['letters']);
      setIsGameActive(true);
    });
  }
  
  return (
    <>
      <button className={isGameActive? "hidden" : ""} onClick={startGame}>CLICK ME</button>
      <div className={isGameActive? "" : "hidden"}>
        <Words words={words}></Words>
        <ul>
          {
            letters.map((l,i) => <li key={i}>{l}</li>)
          }
        </ul>
        <input onChange={e => setInputWord(e.target.value)} id="word" type="text"></input>
        <button onClick={submitWord}>submit</button>
      </div>
    </>
  )
}

export default App;
