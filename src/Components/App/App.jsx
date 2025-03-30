import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';

import { drawHand } from '../../Functions/DrawHand.js';

// Components
import { Draggable } from '../Draggable/Draggable.jsx';
import { Card } from '../Card/Card.jsx';
import { Playerspace } from '../Playerspace/Playerspace.jsx';
import { Grid } from '../Grid/Grid.jsx';

// Styles
import './App.css';
import '../Card/Card.css';
import '../Playerspace/Playerspace.css';
import '../Grid/Grid.css';

const DRAG_OVERLAY_DURATION = 300; // Time in ms between drag end and animation end.

function App() {
  const [activeId, setActiveId] = useState(null);
  const [cardAParent, setCardAParent] = useState(null);
  const [cardBParent, setCardBParent] = useState(null);
  const [dragOverlayDuration, setDragOverlayDuration] = useState(DRAG_OVERLAY_DURATION);
  const [isDraggable, setIsDraggable] = useState(true);
  const [aType, setAType] = useState(null);
  const [bType, setBType] = useState(null);
  const [grid, setGrid] = useState({});
  
  if (cardAParent !== null && cardBParent !== null) if (isDraggable) {
    setDragOverlayDuration(0);
    setIsDraggable(false);
  }

  /* 
    TODO: 
    Call function based on isDraggable that manages the handoff between the current cards being active to being stale
    Also call function that generates two new cards.
    Also call function that checks for game over condition
  */



  useEffect(() => {
    setAType(drawHand());
    setBType(drawHand());


    // REDUNDANT FROM GRID.JSX!! SHOULD ABSTRACT CONTAINER GENERATION ELSEWHERE(?)
    const containers = Array.apply(null, Array(25)).map(function (x, i) { return 'grid-droppable-' + i; });
    let newGrid = {};
    for (const key of containers) newGrid[key] = '';
    setGrid(newGrid);

  }, []);


  // Run when turn is over
  useEffect(() => {
    if (!isDraggable) {
      const newStoreA = <Card type={aType} color={'b'} isPlaced={true} />
      const newStoreB = <Card type={bType} color={'r'} isPlaced={true} />

      setGrid( {...grid, [cardAParent]: newStoreA, [cardBParent]: newStoreB} );
      setAType(drawHand());
      setBType(drawHand());
      setCardAParent(null);
      setCardBParent(null);
      setIsDraggable(true);
      setDragOverlayDuration(DRAG_OVERLAY_DURATION);
    }

  }, [isDraggable]);

  const cardA = <Draggable id='active-card-a' disabled={!isDraggable}>{activeId === 'active-card-a' ? <Card isSelected={true} type={aType} color={'b'} /> : <Card isSelected={false} type={aType} color={'b'} />}</Draggable>
  const cardB = <Draggable id='active-card-b' disabled={!isDraggable}>{activeId === 'active-card-b' ? <Card isSelected={true} type={bType} color={'r'} /> : <Card isSelected={false} type={bType} color={'r'} />}</Draggable>

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className='containers'>        
        <Playerspace cardAParent={cardAParent} cardBParent={cardBParent} cardA={cardA} cardB={cardB} />
        <Grid cardAParent={cardAParent} cardBParent={cardBParent} cardA={cardA} cardB={cardB} grid={grid}  />
      </div>

      {/* Handle live movement of cards */}
      <DragOverlay dropAnimation={{duration: dragOverlayDuration}}>
        {activeId === 'active-card-a' ? <Card isDragging={true} type={aType} color={'b'} /> : <Card isDragging={true} type={bType} color={'r'} />}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    setActiveId(null);

    const { over } = event;         // grid-droppable-n
    const cardId = event.active.id; // active-card-a / active-card-b

    let canDropA = true;
    let canDropB = true;
    let isCardinal = true;

    // TODO: Add alternating color check here

    if (over !== null) {
      // Only enforce cardinality rule if other card has been placed.
      if ((cardAParent !== null && cardId !== 'active-card-a') || (cardBParent !== null && cardId !== 'active-card-b')) isCardinal = checkCardinality(cardId, over.id);

      // Only allow assignment of dropped card to container if target container is empty.
      canDropA = (over.id !== cardBParent) ? true : false;
      canDropB = (over.id !== cardAParent) ? true : false;
    }
    
    if (cardId === 'active-card-a') setCardAParent(over && canDropA && isCardinal ? over.id : null);
    else setCardBParent(over && canDropB && isCardinal ? over.id : null);
  }

  function checkCardinality(cardId, currentContainer) {
    let otherContainer = cardId === 'active-card-a' ? cardBParent : cardAParent; // Get container of already placed card.
    let containerId = Number(otherContainer.split('-').reverse()[0]); // Grab id of already placed card.
    let validContainers = [containerId - 5, containerId - 1, containerId + 1, containerId + 5]; // Create array of legal positions based on already placed card.
    validContainers = validContainers.filter((n) => n >= 0 && n <= 24).map((item) => 'grid-droppable-' + item); // Remove OOB positions and format id.
    return validContainers.includes(currentContainer) ? true : false; // Return true if desired move is cardinal to other card.
  }
}

export { App };