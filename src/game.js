
const TWISTER_LENGTH = 6;
export const readWordsArray = async path =>
{
    return fetch(path)
    .then(res => 
    {
        console.log(res);
        return res.text(); 
    })
    .then(text => 
    {
        return text.split('\r\n')
    });
};

const isWordContained = (smallWord, largeWord) =>
{
    return Array(smallWord).every(letter => 
    {
        const index = largeWord.search(letter);
        if (index === -1)
            return false;
        largeWord = largeWord.slice(0, index) + largeWord.slice(index + 1);
        return true;
    });
}

export const getGameWords = allWords => 
{
    const twister_words = allWords.filter(word => word.length === TWISTER_LENGTH);
    const chosen_word = twister_words[Math.floor(Math.random() * twister_words.length)];
    return allWords.filter(word => isWordContained(word, chosen_word));
};