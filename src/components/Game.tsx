import { useState } from 'react';
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
  currentBoardOfColors: string[];
  setCurrentBoardOfColors: React.Dispatch<React.SetStateAction<string[]>>
  width: number;
  checkColumnOfFour: () => void | boolean;
  checkColumnOfThree: () => void | boolean;
  checkRowOfThree: () => void | boolean;
  checkRowOfFour: () => void | boolean
}




function Game({
   currentBoardOfColors,
   setCurrentBoardOfColors,
   width,
   checkColumnOfFour,
   checkColumnOfThree,
   checkRowOfThree,
   checkRowOfFour
   }: GameProps):JSX.Element {
  const [circleBeingDragged, setCircleBeingDragged] = useState<null | HTMLDivElement>(null)
  const [circleBeingReplaced, setCircleBeingReplace] = useState<null | HTMLDivElement>(null)

  function dragStart(e: React.DragEvent<HTMLDivElement>) {
    setCircleBeingDragged(e.target as HTMLDivElement);
  }

  function dragEnd(e: React.DragEvent<HTMLDivElement>) {
    const idCircleDragged = Number(circleBeingDragged?.getAttribute('data-id')) as number;
    const idCircleReplace = Number(circleBeingReplaced?.getAttribute('data-id')) as number;

    currentBoardOfColors[idCircleReplace] = circleBeingDragged?.getAttribute('data-color') as string;
    currentBoardOfColors[idCircleDragged] = circleBeingReplaced?.getAttribute('data-color') as string;
  }

  function dragDrop(e: React.DragEvent<HTMLDivElement>) {
    setCircleBeingReplace(e.target as HTMLDivElement)
  }

  return (
    <GameBoard>
      {currentBoardOfColors.map((currentColor, index) => (
        <Circle
         key={index}
         draggable={true}
         data-id={index}
         data-color={currentColor}
         currentColor={currentColor}
         onDragStart={(e) => dragStart(e)}
         onDragEnd={(e)=>dragEnd(e)}
         onDrop={(e) => dragDrop(e)}
         onDragEnter={(e) => e.preventDefault()}
         onDragOver={(e) => e.preventDefault()}
         onDragLeave={(e) => e.preventDefault()}
       />
      ))}
    </GameBoard>
  )
}

export default Game;