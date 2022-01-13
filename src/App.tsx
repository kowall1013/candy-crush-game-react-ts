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
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [ i, i + width, i + width * 2, i + width * 3 ]
      const currentColorOfCircle = currentBoardOfColors[i]

     if(columnOfFour.every((circle) => currentBoardOfColors[circle] === currentColorOfCircle)) {
       columnOfFour.forEach((circle) => currentBoardOfColors[circle] = 'white')
     }
    }
  }

  checkColumnOfFour()

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
