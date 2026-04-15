import { useEffect, useState } from 'react'
import './App.css'
import { TWISTER_LENGTH, readWordsArray, getGameWords } from './game'
import { Words } from './Words'
import { Letters } from './Letters'

function App() {
  const NOT_A_WORD = document.querySelector('#notAWord');

  const shuffleArray = arr => 
  {
    for(let i = 0; i < arr.length; ++i)
    {
      let place = Math.floor(Math.random() * (arr.length - i)) + i
      let temp = arr[i];
      arr[i] = arr[place];
      arr[place] = temp;
    }

    return arr;
  };
  
  const submitWord = () =>
  {
    const newWords = [...words];
    const found = newWords.find(word => word['word'] === inputWord);
    if (found !== undefined)
    {
      found['found'] = true;
      clearInput();
    }
    else
    {
      NOT_A_WORD.classList.remove('hidden');
      setTimeout(() => NOT_A_WORD.classList.add('hidden'), 1000);
    }
    setWords(newWords);
  };

  const clearInput = () =>
  {
    const inputArr = Array.from(inputWord);
    setLetters(letters.map(l => l !== ''? l : inputArr.pop()));
    setInputWord('');
  };

  const removeLetterFromInput = index =>
  {
    if (index < inputWord.length)
    {
      const removed = inputWord[index];
      const lettersIndex = letters.indexOf('');
      if(lettersIndex !== -1)
      {
        const newLetters = [...letters];
        newLetters[lettersIndex] = removed;
        setLetters(newLetters);
        setInputWord(inputWord.slice(0, index) + inputWord.slice(index+1, inputWord.length));
      }
      
      return removed;
    }
    return '';
  };

  const addLetterToInput = index =>
  {
    if (index < letters.length)
    {
      const newLetters = [...letters];
      setInputWord(inputWord + letters[index]);
      newLetters[index] = '';
      setLetters(newLetters)
      return true;
    }
    return false;
  };

  const startGame = () => 
  {
    readWordsArray('words.txt').then(wordsRead =>
    {
      const words = getGameWords(wordsRead);
      setWords(words);
      setLetters(shuffleArray(Array.from(words[words.length - 1]['word'])));
      setIsGameActive(true);
    });
  };

  const [words, setWords] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [letters, setLetters] = useState(Array(TWISTER_LENGTH).map(i => ''));
  const [inputWord, setInputWord] = useState([]);

  useEffect(startGame, [])
  return (
    <>
      <button className={isGameActive? "hidden" : ""} onClick={startGame}>CLICK ME</button>
      <div className={isGameActive? "" : "hidden"}>
        <Words words={words}></Words>
        <Letters letters={letters} addLetter={addLetterToInput}></Letters>
        <h3>{inputWord}</h3>
        <button onClick={submitWord}>submit</button>
        <button onClick={() => removeLetterFromInput(inputWord.length - 1)}>X</button>
        <h3 id="notAWord" className="hidden">זו לא מילה!</h3>
      </div>
    </>
  );
}

export default App;
