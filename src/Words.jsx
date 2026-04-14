export function Words({words}) {
  return (
    <div className="flex wrap">
      {
        words.map((word, i) => <p key={i}>{word['found']? word['word'] : '□'.repeat(word['word'].length)}</p>)
      }
    </div>
  );
}