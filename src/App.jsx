import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import { Draggable } from './Components/Draggable';
import { Droppable } from './Components/Droppable';
import { GridCell } from './Components/GridCell';

function App() {
  const [parent, setParent] = useState(null);

  const containers = ['grid-droppable-1', 'grid-droppable-2', 'grid-droppable-3'];

  const draggableMarkup = (
    <Draggable id='draggable'>Drag me</Draggable>
  );
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        <GridCell id={id} key={id}>
          {parent === id ? draggableMarkup : 'test'}
        </GridCell>
      ))}
    </DndContext>
  );
  
  function handleDragEnd(event) {
    const {over} = event;
    setParent(over ? over.id : null);
  }
}

export { App };