import React, {useState} from 'react';
import {DndContext, DragOverlay} from '@dnd-kit/core';

import { Draggable } from './Components/Draggable';
import { GridCell } from './Components/GridCell';


import { Item } from './Item';

// Build an empty array to represent grid cells
const containers = Array.apply(null, Array(25)).map(function (x, i) { return 'grid-droppable-' + i; });

function App() {
  const [items] = useState(['1', '2', '3', '4', '5']);
  const [activeId, setActiveId] = useState(null);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    {items.map(id =>
          <Draggable key={id} id={id}>
            {activeId === id ? <>{`Item ${id} SELECTED`}</> : <>{`Item ${id} BASESTATE`}</>}
          </Draggable>
    )}


    <DragOverlay>
        {activeId ? (
            <Item value={`Item ${activeId} DRAGSTATE`} /> 
        ): null}
        </DragOverlay>
    </DndContext>
  );
  

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }
  function handleDragEnd() {
    setActiveId(null);
  }
}

export { App };