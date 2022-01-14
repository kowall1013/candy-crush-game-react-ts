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

  function checkColumnOfFour() {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const currentColor = currentBoardOfColors[i];

      if(columnOfFour.every((circle) => currentBoardOfColors[circle] === currentColor)) {
        columnOfFour.forEach((cirlce) => currentBoardOfColors[cirlce] = 'white')
      }
    }
  }

  function checkRowOfFour() {
    for(let i = 0; i <=64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const currentColor = currentBoardOfColors[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];

      if(notValid.includes(i)) continue

      if(rowOfFour.every((circle) => currentBoardOfColors[circle] === currentColor)){
        rowOfFour.forEach((circle) => currentBoardOfColors[circle] = 'white')
      }
    }
  }

  function checkColumnOfThree() {
    for(let i = 0; i <= 47; i++ ) {
      const columnOfThree = [i, i + width, i + width * 2]
      const currentColor = currentBoardOfColors[i]

      if(columnOfThree.every((circle) => currentBoardOfColors[circle] === currentColor)) {
        columnOfThree.forEach((circle) => currentBoardOfColors[circle] = 'white')
      }
    }
  }

  function checkRowOfThree() {
    
  }



  checkColumnOfThree()

  useEffect(() => {
    createBoard()
  }, [])

  return (
    <Wrapper>
      <Game currentBoardOfColors={currentBoardOfColors} />
    </Wrapper>
  );
}

export default App;

