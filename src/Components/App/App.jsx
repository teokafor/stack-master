import React, { useState, useEffect, useRef } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
// Helper functions
import { drawHand } from '../../Functions/DrawHand.js';
import { generateBlackouts } from '../../Functions/Blackout.js';
import { checkCardinality, checkShapes, checkColor, calculateScore } from '../../Functions/Rules.js';
// Components
import { Draggable } from '../Draggable/Draggable.jsx';
import { Card } from '../Card/Card.jsx';
import { Playerspace } from '../Playerspace/Playerspace.jsx';
import { Grid } from '../Grid/Grid.jsx';
import { ChainManager } from '../ChainManager/ChainManager.jsx';
// Styles
import './App.css';
import '../Card/Card.css';
import '../Playerspace/Playerspace.css';
import '../Grid/Grid.css';
import '../ChainManager/ChainManager.css';
import '../Help/Help.css'

const DRAG_OVERLAY_DURATION = 300; // Time in ms between drag end and animation end.
const CHAIN_LIMIT = 5;
const GRID_LENGTH = 16;

function App() {
  // General management
  const [activeId, setActiveId] = useState(null);
  const [dragOverlayDuration, setDragOverlayDuration] = useState(DRAG_OVERLAY_DURATION);
  const [isDraggable, setIsDraggable] = useState(true);
  // Cards
  const [cardAParent, setCardAParent] = useState(null);
  const [cardBParent, setCardBParent] = useState(null);
  const [aType, setAType] = useState(null);
  const [bType, setBType] = useState(null);
  // Grid
  const [grid, setGrid] = useState({});
  const [blackouts, setBlackouts] = useState([]);
  // Scoring
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [roundMultiplier, setRoundMultiplier] = useState(1);
  const [chainA, setChainA] = useState(null);
  const [chainB, setChainB] = useState(null);

  if (cardAParent !== null && cardBParent !== null) if (isDraggable) {
    setDragOverlayDuration(0);
    setIsDraggable(false);
  }

  useEffect(() => {
    setAType(drawHand());
    setBType(drawHand());

    const containers = Array.apply(null, Array(GRID_LENGTH)).map(function (x, i) { return 'grid-droppable-' + i; });
    let newGrid = {};
    for (const key of containers) newGrid[key] = '';
    setGrid(newGrid);

    setBlackouts(generateBlackouts(containers));
  }, []);

  // Run when turn is over
  useEffect(() => {
    if (!isDraggable) {
      // Only store card to grid if grid cell is already empty. 
      let newStoreA = (grid[cardAParent] === '') ? <Card type={aType} color={'b'} isPlaced={true} isCleared={false} /> : <Card type={aType} color={'b'} isCleared={true} />;
      let newStoreB = (grid[cardBParent] === '') ? <Card type={bType} color={'r'} isPlaced={true} isCleared={false} /> : <Card type={bType} color={'r'} isCleared={true} />;
      
      let isAClear = newStoreA.props.isCleared;
      let isBClear = newStoreB.props.isCleared;

      setChainA(!isDraggable && scoreA > 0 ? <ChainManager score={scoreA} roundMultiplier={roundMultiplier} id={cardAParent} /> : null);
      setChainB(!isDraggable && scoreB > 0 ? <ChainManager score={scoreB} roundMultiplier={roundMultiplier} id={cardBParent} /> : null);

      // Set grid first, regardless of clear status. If any cards need to play an animation, they must be rendered first!
      setGrid({ ...grid, [cardAParent]: newStoreA, [cardBParent]: newStoreB });
      
      // Wait out the duration of the animation (if any played), then conditionally clear the grid and re-render it.
      setTimeout(() => {
        if (isAClear) newStoreA = '';
        if (isBClear) newStoreB = '';
        setGrid({ ...grid, [cardAParent]: newStoreA, [cardBParent]: newStoreB });
      }, 300);

      setIsDraggable(true);

      // Longer time allotted for score text
      setTimeout(() => {
        setScoreA(0);
        setScoreB(0);
        setChainA(null);
        setChainB(null);

        // Check if the multiplier can increase
        if (scoreA !== 0 || scoreB !== 0) {
          if (roundMultiplier < CHAIN_LIMIT) setRoundMultiplier(cur => cur + 1);
        } else {
          setRoundMultiplier(1);
        }
      }, 950);

      setRoundScore(cur => cur + (scoreA + scoreB) * roundMultiplier);
      setAType(drawHand());
      setBType(drawHand());
      setCardAParent(null);
      setCardBParent(null);
      setDragOverlayDuration(DRAG_OVERLAY_DURATION);
    }
  }, [isDraggable]);

  const cardA = <Draggable id='active-card-a' disabled={!isDraggable}>{activeId === 'active-card-a' ? <Card isSelected={true} type={aType} color={'b'} /> : <Card isSelected={false} isOnBoard={cardAParent !== null ? true : false} type={aType} color={'b'} />}</Draggable>
  const cardB = <Draggable id='active-card-b' disabled={!isDraggable}>{activeId === 'active-card-b' ? <Card isSelected={true} type={bType} color={'r'} /> : <Card isSelected={false} isOnBoard={cardBParent !== null ? true : false} type={bType} color={'r'} />}</Draggable>


  return (
    <DndContext autoScroll={false} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className='containers'>
        <Playerspace cardAParent={cardAParent} cardBParent={cardBParent} cardA={cardA} cardB={cardB} curScore={roundScore} mult={roundMultiplier}/>
        <Grid cardAParent={cardAParent} cardBParent={cardBParent} cardA={cardA} cardB={cardB} grid={grid} containers={blackouts} chainToastA={chainA} chainToastB={chainB} />
      </div>

      {/* Handle live movement of cards */}
      <DragOverlay dropAnimation={{ duration: dragOverlayDuration }} zIndex={2}>
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

    let isALegal = true;
    let isBLegal = true;

    // skip checks if card was not placed on cell
    if (over === null) {
      isALegal = false;
      isBLegal = false;
    }

    // Only enforce cardinality rule if other card has been placed.
    if ((cardAParent !== null && cardId !== 'active-card-a') || (cardBParent !== null && cardId !== 'active-card-b')) {
      if (cardId === 'active-card-a' && isALegal) isALegal = checkCardinality(cardId, over.id, cardAParent, cardBParent);
      else if (cardId === 'active-card-b' && isBLegal) isBLegal = checkCardinality(cardId, over.id, cardAParent, cardBParent);
    }

    // Run shape check
    if (isALegal && cardId === 'active-card-a') isALegal = checkShapes(cardId, over.id, cardA, cardB, grid);
    else if (isBLegal && cardId === 'active-card-b') isBLegal = checkShapes(cardId, over.id, cardA, cardB, grid);

    // Run color check 
    if (isALegal && cardId === 'active-card-a') isALegal = checkColor(cardId, over.id, cardA, cardB, grid);
    else if (isBLegal && cardId === 'active-card-b') isBLegal = checkColor(cardId, over.id, cardA, cardB, grid);

    // Granted the desired move passes all checks, calculate score:
    if (isALegal && cardId === 'active-card-a') isALegal = calculateScore(cardId, over.id, cardA, cardB, grid, setScoreA, setScoreB);
    else if (isBLegal && cardId === 'active-card-b') isBLegal = calculateScore(cardId, over.id, cardA, cardB, grid, setScoreA, setScoreB);

    // Starts end-of-round code.      
    if (cardId === 'active-card-a') setCardAParent(isALegal ? over.id : null);
    else setCardBParent(isBLegal ? over.id : null);
  }
}

export { App };