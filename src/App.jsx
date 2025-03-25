import React, {useState} from 'react';
import {DndContext, DragOverlay} from '@dnd-kit/core';

import { Draggable } from './Components/Draggable';
import { GridCell } from './Components/GridCell';


import { Item } from './Item';

// Build an empty 5x5 array to represent grid cells
const containers = Array.apply(null, Array(25)).map(function (x, i) { return 'grid-droppable-' + i; });

function App() {
  const [activeId, setActiveId] = useState(null);

  const [cardAParent, setCardAParent] = useState(null);
  const [cardBParent, setCardBParent] = useState(null);

  // Check if both cards belong to a parent (i.e., a droppable.)
  const isDraggable = (cardAParent === null || cardBParent === null) ? false : true;

  // TODO: Refactor rendered card into its own component.
  const cardA = <Draggable id='active-card-a' disabled={isDraggable}>{activeId === 'active-card-a' ? <Item value={`Item ASTATIC SELECTED`} /> :  <Item value={`Item ASTATIC BASESTATE`} />}</Draggable>
  const cardB = <Draggable id='active-card-b' disabled={isDraggable}>{activeId === 'active-card-b' ? <Item value={`Item BSTATIC SELECTED`} /> :  <Item value={`Item BSTATIC BASESTATE`} />}</Draggable>

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    {/* Move the card to the top if not related to a grid cell. */}
    {cardAParent === null ? cardA : null}
    {cardBParent === null ? cardB : null}

    <div className="grid-bg">{
    // Populate grid
    containers.map((id) => (
    <GridCell id={id} key={id}>
        {/* Make card child of grid cell from drag end. */}
        {cardAParent === id ? cardA : null}
        {cardBParent === id ? cardB : null}
        </GridCell>))
        
    }</div>

    {/* Handle live movement of cards */}
    <DragOverlay>
        {/* TOOD: Refactor rendered card into its own component. */}
        {activeId === 'active-card-a' ? <Item value={`Item ASTATIC DRAGSTATE`} isDragging={true} /> : <Item value={'Item BSTATIC DRAGSTATE'} isDragging={true} />}
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