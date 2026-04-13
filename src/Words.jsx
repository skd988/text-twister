export function Words({words}) {
    return <>
      <ul>
        {
          words.map((word, i) => <li key={i}>{word['found']? word['word'] : '□'.repeat(word['word'].length)}</li>)
        }
      </ul>
    </>
}