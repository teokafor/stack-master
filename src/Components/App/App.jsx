import React, { useState, useEffect, useRef } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
// Helper functions
import { drawHand } from '../../Functions/DrawHand.js';
import { generateBlackouts } from '../../Functions/Blackout.js';
import { checkCardinality, checkShapes, checkColor, calculateScore } from '../../Functions/Rules.js';
import { checkForGameOver } from '../../Functions/GameOver.js';
// Components
import { Draggable } from '../Draggable/Draggable.jsx';
import { Card } from '../Card/Card.jsx';
import { Playerspace } from '../Playerspace/Playerspace.jsx';
import { Grid } from '../Grid/Grid.jsx';
import { ChainManager } from '../ChainManager/ChainManager.jsx';
// Styles
import './App.css';

const DRAG_OVERLAY_DURATION = 300; // Time in ms between drag end and animation end.
const CHAIN_LIMIT = 5;
const GRID_SIZE = 16;

function App() {
  // General management
  const [activeId, setActiveId] = useState(null);
  const [dragOverlayDuration, setDragOverlayDuration] = useState(DRAG_OVERLAY_DURATION);
  const [isDraggable, setIsDraggable] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
  const [roundMultiplier, setRoundMultiplier] = useState(1);
  const [chainA, setChainA] = useState(null);
  const [chainB, setChainB] = useState(null);
  const [roundScore, setRoundScore] = useState(0);
  const [highScore, setHighScore] = useState();
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  if (cardAParent !== null && cardBParent !== null) if (isDraggable) {
    setDragOverlayDuration(0);
    setIsDraggable(false);
  }

  // Run on browser load
  useEffect(() => {
    initGame();
  }, []);

  function initGame() {    
    setHighScore(localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0);
    setRoundScore(0);
    setRoundMultiplier(1);
    setIsGameOver(false);
    setAType(drawHand());
    setBType(drawHand());
    
    const containers = Array.apply(null, Array(GRID_SIZE)).map(function (x, i) { return 'grid-droppable-' + i; });
    let newGrid = {};
    for (const key of containers) newGrid[key] = '';
    setGrid(newGrid);
    
    setBlackouts(generateBlackouts());
    setIsDraggable(true);
  }

  // Run when turn is over
  useEffect(() => {
    if (!isDraggable && !isGameOver) {      
      // Only store card to grid if grid cell is already empty. 
      let newStoreA = (grid[cardAParent] === '') ? <Card type={aType} color={'b'} isPlaced={true} isCleared={false} /> : <Card type={aType} color={'b'} isCleared={true} />;
      let newStoreB = (grid[cardBParent] === '') ? <Card type={bType} color={'r'} isPlaced={true} isCleared={false} /> : <Card type={bType} color={'r'} isCleared={true} />;
      
      let isAClear = newStoreA.props.isCleared;
      let isBClear = newStoreB.props.isCleared;

      setChainA(!isDraggable && scoreA > 0 ? <ChainManager score={scoreA} roundMultiplier={roundMultiplier} id={cardAParent} /> : null);
      setChainB(!isDraggable && scoreB > 0 ? <ChainManager score={scoreB} roundMultiplier={roundMultiplier} id={cardBParent} /> : null);

      // Check if the multiplier can increase
      if (scoreA !== 0 || scoreB !== 0) {
        if (roundMultiplier < CHAIN_LIMIT) setRoundMultiplier(cur => cur + 1);
      } else {
        setRoundMultiplier(1);
      }

      // Set grid first, regardless of clear status. If any cards need to play an animation, they must be rendered first!
      setGrid({ ...grid, [cardAParent]: newStoreA, [cardBParent]: newStoreB });

      // Play generic card draw animation before actually drawing new cards.
      setAType({isDrawn: true});
      setBType({isDrawn: true});  
      
      // Wait out the duration of the animation (if any played), then conditionally clear the grid and re-render it.
      setTimeout(() => {
        if (isAClear) newStoreA = '';
        if (isBClear) newStoreB = '';
        setGrid({ ...grid, [cardAParent]: newStoreA, [cardBParent]: newStoreB }); 
      }, 300);

      // Longer time allotted for score text
      setTimeout(() => {
        setAType(drawHand());
        setBType(drawHand()); 
        setIsDraggable(true);

        setScoreA(0);
        setScoreB(0);
        setChainA(null);
        setChainB(null);
      }, 950);

      setRoundScore(cur => cur + (scoreA + scoreB) * roundMultiplier);
      setCardAParent(null);
      setCardBParent(null);
      setDragOverlayDuration(DRAG_OVERLAY_DURATION);
    }
  }, [isDraggable]);

  // Run when new cards are drawn
  useEffect(() => {
    if (checkForGameOver(aType, bType, grid, blackouts)) {
      setIsDraggable(false);
      setIsGameOver(true);

      if (roundScore > highScore) {
        localStorage.setItem("highScore", roundScore);
        setIsNewHighScore(true);
      }
    }
  }, [aType]);

  // Run when the player makes an illegal move
  useEffect(() => {
    setTimeout(() => {
      if (errorMsg !== '') setErrorMsg('');
    }, 2400);
  }, [errorMsg]);

  const cardA = <Draggable id='active-card-a' disabled={!isDraggable}>{activeId === 'active-card-a' ? <Card isSelected={true} type={aType} color={'b'} /> : <Card isSelected={false} isOnBoard={cardAParent !== null ? true : false} type={aType} color={'b'} />}</Draggable>
  const cardB = <Draggable id='active-card-b' disabled={!isDraggable}>{activeId === 'active-card-b' ? <Card isSelected={true} type={bType} color={'r'} /> : <Card isSelected={false} isOnBoard={cardBParent !== null ? true : false} type={bType} color={'r'} />}</Draggable>

  return (
    <DndContext autoScroll={false} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className='containers'>
        <Playerspace cardAParent={cardAParent} cardBParent={cardBParent} cardA={cardA} cardB={cardB} curScore={roundScore} mult={roundMultiplier} highScore={highScore} />
        <Grid cardAParent={cardAParent} cardBParent={cardBParent} cardA={cardA} cardB={cardB} grid={grid} containers={blackouts} chainToastA={chainA} chainToastB={chainB} isGameOver={isGameOver} resetFunc={initGame} isNewHighScore={isNewHighScore} errorMsg={errorMsg}  />
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
    if (over === null || over.id.includes('blackout')) {
      isALegal = false;
      isBLegal = false;
    }

    // Only enforce cardinality rule if other card has been placed.
    if (isALegal && isBLegal) {
      if ((cardAParent !== null && cardId !== 'active-card-a') || (cardBParent !== null && cardId !== 'active-card-b')) {
        if (cardId === 'active-card-a' && isALegal) {
          if (!checkCardinality(cardId, over.id, cardAParent, cardBParent)) isALegal = false;
        }
        else if (cardId === 'active-card-b' && isBLegal) {
          if (!checkCardinality(cardId, over.id, cardAParent, cardBParent)) isBLegal = false;
        }
        if (!isALegal || !isBLegal) setErrorMsg('card placement is not adjacent');
      }
    }
    // Run shape check
    if (isALegal && isBLegal) {
      if (isALegal && cardId === 'active-card-a') isALegal = checkShapes(cardId, over.id, cardA, cardB, grid);
      else if (isBLegal && cardId === 'active-card-b') isBLegal = checkShapes(cardId, over.id, cardA, cardB, grid);

      if (!isALegal || !isBLegal) setErrorMsg('card type must match');
    }

    // Run color check 
    if (isALegal && isBLegal) {
      if (isALegal && cardId === 'active-card-a') isALegal = checkColor(cardId, over.id, cardA, cardB, grid);
      else if (isBLegal && cardId === 'active-card-b') isBLegal = checkColor(cardId, over.id, cardA, cardB, grid);

      if (!isALegal || !isBLegal) setErrorMsg('card color must match');
    }


    // Granted the desired move passes all checks, calculate score:
    if (isALegal && cardId === 'active-card-a') isALegal = calculateScore(cardId, over.id, cardA, cardB, grid, setScoreA, setScoreB);
    else if (isBLegal && cardId === 'active-card-b') isBLegal = calculateScore(cardId, over.id, cardA, cardB, grid, setScoreA, setScoreB);

    // Starts end-of-round code.      
    if (cardId === 'active-card-a') setCardAParent(isALegal ? over.id : null);
    else setCardBParent(isBLegal ? over.id : null);
  }
}

export { App };