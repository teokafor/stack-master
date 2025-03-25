import React, {useState} from 'react';
import {DndContext, DragOverlay} from '@dnd-kit/core';

import { Draggable } from './Components/Draggable';
import { GridCell } from './Components/GridCell';


import { Item } from './Item';

// Build an empty array to represent grid cells
const containers = Array.apply(null, Array(25)).map(function (x, i) { return 'grid-droppable-' + i; });

function App() {
  const [items] = useState(['active-card-a', 'active-card-b']); // pretty sure this state + the map can be converted into 2 static lines.
  const [activeId, setActiveId] = useState(null);

  const [cardAParent, setCardAParent] = useState(null);
  const [cardBParent, setCardBParent] = useState(null);

  const cardA = <Draggable id='active-card-a'>{activeId === 'active-card-a' ? <>{`Item ASTATIC SELECTED`}</> : <>{`Item ASTATIC BASESTATE`}</>}</Draggable>
  const cardB = <Draggable id='active-card-b'>{activeId === 'active-card-b' ? <>{`Item BSTATIC SELECTED`}</> : <>{`Item BSTATIC BASESTATE`}</>}</Draggable>

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    {/* Move the card to the top if not related to a grid cell. */}
    {cardAParent === null ? cardA : null}
    {cardBParent === null ? cardB : null}

    <div className="grid-bg">{
    containers.map((id) => (
    <GridCell id={id} key={id}>
        {/* Make card child of grid cell from drag end. */}
        {cardAParent === id ? cardA : null}
        {cardBParent === id ? cardB : null}
        </GridCell>))
        
    }</div>

    {/* Handle live movement of cards */}
    <DragOverlay>
        {activeId === 'active-card-a' ? <Item value={`Item ASTATIC DRAGSTATE`} /> : <Item value={`Item BSTATIC DRAGSTATE`} />}
        </DragOverlay>
    </DndContext>
  );
  

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    setActiveId(null);

    const {over} = event;
    const cardId = event.active.id;
    if (cardId === 'active-card-a') setCardAParent(over ? over.id : null);
    else setCardBParent(over ? over.id : null);
  }
}

export { App };