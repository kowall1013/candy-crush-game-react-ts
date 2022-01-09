import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const width = 8;
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
];

const Wrapper = styled.div`
  display: flex;
  padding: 30px;
`;

const Game = styled.div`
  width: 560px;
  height: 560px;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
`;

function App():JSX.Element {
  const [currentColorArrangement, setCurrentColorArragement] = useState<string[]>([])

  const checkColumnOfFour= useCallback(
    () => {
      for(let i = 0; i < 39; i++) {
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        const decidedColor = currentColorArrangement[i]
  
        if(columnOfFour.every((square) => currentColorArrangement[square] === decidedColor)) {
          columnOfFour.forEach((square) => currentColorArrangement[square] = '')
        }
      }
    },
    [currentColorArrangement],
  );

  const checkRowOfFour = useCallback(
    () => {
      for(let i = 0; i < 64; i++) {
        const rowOfFour = [i, i + 1, i + 2, i + 3]
        const decidedColor = currentColorArrangement[i]
        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

        if(notValid.includes(i)) continue
  
        if(rowOfFour.every((square) => currentColorArrangement[square] === decidedColor)) {
          rowOfFour.forEach((square) => currentColorArrangement[square] = '')
        }
      }
    },
    [currentColorArrangement],
  );

  const checkColumnOfThree = useCallback(
    () => {
      for(let i = 0; i < 47; i++) {
        const columnOfThree = [i, i + width, i + width * 2]
        const decidedColor = currentColorArrangement[i]
  
        if(columnOfThree.every((square) => currentColorArrangement[square] === decidedColor)) {
          columnOfThree.forEach((square) => currentColorArrangement[square] = '')
        }
      }
    },
    [currentColorArrangement],
  );

  const checkRowOfThree = useCallback(
    () => {
      for(let i = 0; i < 64; i++) {
        const rowOfThree = [i, i + 1, i + 2]
        const decidedColor = currentColorArrangement[i]
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

        if(notValid.includes(i)) continue
  
        if(rowOfThree.every((square) => currentColorArrangement[square] === decidedColor)) {
          rowOfThree.forEach((square) => currentColorArrangement[square] = '')
        }
      }
    },
    [currentColorArrangement],
  );

  const moveIntoSquareBelow = useCallback(
    () => {
      for(let i = 0; i < 64 - width; i++ ) {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)

        if (isFirstRow && currentColorArrangement[i] === '') {
          let randomNumber = Math.floor(Math.random() * candyColors.length)
          currentColorArrangement[i] = candyColors[randomNumber]

        }

        if ((currentColorArrangement[i + width]) === '') {
          currentColorArrangement[i + width] = currentColorArrangement[i]
          currentColorArrangement[i] = ''
        }
      }
    },
    [currentColorArrangement],
  );

  function createBoard() {
    const randomColorArrangement = []
    for(let i=0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArragement(randomColorArrangement);
  }

  function dragStart() {}
  function dragDrop() {}
  function dragEnd() {}

  useEffect(() => {
    createBoard()
  }, [])  

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfFour()
      checkRowOfFour()
      checkColumnOfThree()
      checkRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArragement([...currentColorArrangement])
    }, 100)

    return () => clearInterval(timer)

  }, [checkColumnOfFour, checkColumnOfThree, currentColorArrangement, checkRowOfThree, checkRowOfFour, moveIntoSquareBelow])  

  return (
    <Wrapper>
      <Game>
        {currentColorArrangement.map(( candyColor, index) => (
          <Image 
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </Game>
    </Wrapper>
  );
}

export default App;
