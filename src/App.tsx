import { useState } from 'react';

const width = 8;
const candyColors = [
  'blue',
  'green',
  'orange',
  'purlple',
  'red',
  'yellow'
];

function App():JSX.Element {
  const [currentColorArrangement, setCurrentColorArragement] = useState<string[]>([])

  function createBoard() {
    const randomColorArrangement = []
    for(let i=0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArragement(randomColorArrangement);
  }

  createBoard()

  return (
    <div>
     
    </div>
  );
}

export default App;
