export const TWISTER_LENGTH = 6;

export const readWordsArray = async path =>
{
  return fetch(path)
  .then(res => res.text())
  .then(text => text.split('\r\n'));
};

const lettersObjectFromWord = word => 
{
  const letters = {};
  Array.from(word).forEach(l => 
  {
    if (letters[l] !== undefined)
      letters[l] += 1;
    else
      letters[l] = 1; 
  });
  return letters;
};

export const getGameWords = allWords => 
{
  const twisterWords = allWords.filter(word => word.length === TWISTER_LENGTH);
  const chosenWord = twisterWords[Math.floor(Math.random() * twisterWords.length)];
  const letters = lettersObjectFromWord(chosenWord)
  return allWords.filter(word => 
  {
    const wordLetters = lettersObjectFromWord(word);
    return Object.keys(wordLetters).every(l => letters[l] !== undefined && wordLetters[l] <= letters[l]); 
  })
  //.sort((a, b) => a.length !== b.length? a.length - b.length : (a < b? -1 : (b < a? 1 : 0)))};
  .sort((a, b) => 
  {
    if (a.length !== b.length)
      return a.length - b.length;
    if (a > b)
      return -1;
    if (a < b)
      return 1;
    return 0;
  })
  .map(word => ({'word': word, 'found': false}));
}