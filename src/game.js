
const TWISTER_LENGTH = 6;
export const getWordsArray = path =>
{
    fetch(path)
    .then(res => 
    {
        console.log(res);
        return res.text(); 
    })
    .then(text => 
    {
        return text.split('\r\n')
    })
    .then(ars => console.log(ars))
};

export const getGameWords = allWords => 
{
    all
}