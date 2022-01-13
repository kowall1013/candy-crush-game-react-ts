import styled from 'styled-components';

const GameBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 320px;
  border: 2px dotted gray;
  padding: 8px;
`;

type CircleProps = {
  currentColor: string;
}

const Circle = styled.div<CircleProps>`
  background-color: ${({ currentColor }) => currentColor};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

type GameProps = {
  currentBoardOfColors: string[]
}

function Game({ currentBoardOfColors }: GameProps):JSX.Element {
  return (
    <GameBoard>
      {currentBoardOfColors.map((currentColor, index) => (
        <Circle key={index} onClick={(e) => console.log(e.target)} data-id={index}  currentColor={currentColor} />
      ))}
    </GameBoard>
  )
}

export default Game;