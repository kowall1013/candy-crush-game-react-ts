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
