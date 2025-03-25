import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import { Draggable } from './Components/Draggable';
import { GridCell } from './Components/GridCell';


// Build an empty array to represent grid cells
const containers = Array.apply(null, Array(25)).map(function (x, i) { return 'grid-droppable-' + i; });

function App() {
  const [cardAParent, setCardAParent] = useState(null);
  const [cardBParent, setCardBParent] = useState(null);
  const cardA = (<Draggable id='active-card-a'>Card A</Draggable>);
  const cardB = (<Draggable id='active-card-b'>Card B</Draggable>);
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Move the card to the top if not related to a grid cell. */}
      {cardAParent === null ? cardA : null} 
      {cardBParent === null ? cardB : null}
      {
        <div className="grid-bg">
        {containers.map((id) => (
          <GridCell id={id} key={id}>
            {/* Add draggable to matching element from drag end. */}
            {cardAParent === id ? cardA : null} 
            {cardBParent === id ? cardB : null}
          </GridCell>
          ))}
        </div>
      }
      
    </DndContext>
  );
  
  function handleDragEnd(event) {
    const {over} = event;
    const cardId = event.active.id;

    if (cardId === 'active-card-a') setCardAParent(over ? over.id : null);
    else setCardBParent(over ? over.id : null);
  }
}

export { App };