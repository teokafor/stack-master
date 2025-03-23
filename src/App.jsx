import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import { Draggable } from './Components/Draggable';
import { Droppable } from './Components/Droppable';
import { GridCell } from './Components/GridCell';


// Build an empty array to represent grid cells
const containers = Array.apply(null, Array(25)).map(function (x, i) { return 'grid-droppable-' + i; });

function App() {
  const [parent, setParent] = useState(null);

  const draggableMarkup = (
    <Draggable id='draggable'>Drag me</Draggable>
  );
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {
        <div className="grid-bg">
        {containers.map((id) => (
          <GridCell id={id} key={id}>
            {parent === id ? draggableMarkup : 'test'}
          </GridCell>
          ))}
        </div>
      }
      
    </DndContext>
  );
  
  function handleDragEnd(event) {
    const {over} = event;
    setParent(over ? over.id : null);
  }
}

export { App };