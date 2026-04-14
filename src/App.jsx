import { useEffect, useState } from 'react'
import './App.css'
import { TWISTER_LENGTH, readWordsArray, getGameWords } from './game'
import { Words } from './Words'
import { Letters } from './Letters'

function App() {
  const NOT_A_WORD = document.querySelector('#notAWord');

  const submitWord = () =>
  {
    const newWords = [...words];
    const found = newWords.find(word => word['word'] === inputWord);
    if (found !== undefined)
      found['found'] = true;
    else
    {
      NOT_A_WORD.classList.remove('hidden');
      setTimeout(() => NOT_A_WORD.classList.add('hidden'), 1000);
    }
    setWords(newWords);
  };

  const removeLetter = event =>
  {
    if (inputWord.length)
      setInputWord(inputWord.slice(0, -1));
  };

  const addLetter = event =>
  {
    const letter = event.target.value;
    if (inputWord.length < TWISTER_LENGTH)
      setInputWord(inputWord + letter);
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
  };

  useEffect(startGame, [])
  return (
    <>
      <button className={isGameActive? "hidden" : ""} onClick={startGame}>CLICK ME</button>
      <div className={isGameActive? "" : "hidden"}>
        <Words words={words}></Words>
        <Letters letters={letters} addLetter={addLetter}></Letters>
        <h3>{inputWord}</h3>
        <button onClick={submitWord}>submit</button>
        <button onClick={removeLetter}>X</button>
        <h3 id="notAWord" className="hidden">זו לא מילה!</h3>
      </div>
    </>
  );
}

export default App;
