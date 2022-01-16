import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Game from './components/Game';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
`;

const width = 8;
const gameSpeed = 100;
const colors = [
  'red',
  'green',
  'blue',
  'black',
  'orange',
  'purple'
];

function App():JSX.Element {
  const [currentBoardOfColors, setCurrentBoardOfColors] = useState<string[]>([])

  function createBoard(): void {
    const boardOfColors = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = Math.floor(Math.random() * colors.length);
      boardOfColors.push(colors[randomColor])
    }
    setCurrentBoardOfColors(boardOfColors);
  }

  const checkColumnOfFour = useCallback(() => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const currentColor = currentBoardOfColors[i];
      const isBlank = currentBoardOfColors[i] === 'white'

      if(columnOfFour.every((circle) => currentBoardOfColors[circle] === currentColor && !isBlank)) {
        columnOfFour.forEach((cirlce) => currentBoardOfColors[cirlce] = 'white')
        return true
      }
    }
  }, [currentBoardOfColors])

  const checkRowOfFour = useCallback(() => {
    for(let i = 0; i <= 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const currentColor = currentBoardOfColors[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentBoardOfColors[i] === 'white'

      if(notValid.includes(i)) continue

      if(rowOfFour.every((circle) => currentBoardOfColors[circle] === currentColor && !isBlank)){
        rowOfFour.forEach((circle) => currentBoardOfColors[circle] = 'white')
        return true
      }
    }
  }, [currentBoardOfColors])

  const checkColumnOfThree = useCallback(() => {
    for(let i = 0; i <= 47; i++ ) {
      const columnOfThree = [i, i + width, i + width * 2]
      const currentColor = currentBoardOfColors[i]
      const isBlank = currentBoardOfColors[i] === 'white'

      if(columnOfThree.every((circle) => currentBoardOfColors[circle] === currentColor && !isBlank)) {
        columnOfThree.forEach((circle) => currentBoardOfColors[circle] = 'white')
        return true
      }
    }
  }, [currentBoardOfColors])

  const checkRowOfThree = useCallback(() => {
    for(let i = 0; i <= width * width; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const currentColor = currentBoardOfColors[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentBoardOfColors[i] === 'white'

      if(notValid.includes(i)) continue

      if(rowOfThree.every((circle) => currentBoardOfColors[circle] === currentColor && !isBlank)) {
        rowOfThree.forEach((circle) => currentBoardOfColors[circle] = 'white')
        return true
      }
    }
  }, [currentBoardOfColors])

  const moveBlankColorOutsideSquare = useCallback(() => {
    for (let i = 0; i <= 55 ; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i);

      if(isFirstRow && currentBoardOfColors[i] === 'white') {
        const randomNumber = Math.floor(Math.random() * colors.length)
        currentBoardOfColors[i] = colors[randomNumber]
      }

      if(currentBoardOfColors[i + width] === 'white') {
        currentBoardOfColors[i + width] = currentBoardOfColors[i]
        currentBoardOfColors[i] = 'white'
      }
      
    }
    
  }, [currentBoardOfColors])

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfFour()
      checkRowOfFour()
      checkRowOfThree()
      checkColumnOfThree()
      moveBlankColorOutsideSquare()
      setCurrentBoardOfColors([...currentBoardOfColors]);
    }, gameSpeed)

    return () => clearInterval(timer)
  }, [checkColumnOfFour, checkRowOfFour, checkRowOfThree, checkColumnOfThree, currentBoardOfColors, moveBlankColorOutsideSquare])

  return (
    <Wrapper>
      <Game
       currentBoardOfColors={currentBoardOfColors}
       setCurrentBoardOfColors={setCurrentBoardOfColors}
       width={width}
       checkColumnOfFour={checkColumnOfFour}
       checkColumnOfThree={checkColumnOfThree}
       checkRowOfThree={checkRowOfThree}
       checkRowOfFour={checkColumnOfThree}
      />
    </Wrapper>
  );
}

export default App;


