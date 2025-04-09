import { useState } from "react";
import { DummyCard } from "../Card/Card";
import { Help } from "../Help/Help";

import './Playerspace.css';

export function Playerspace({cardAParent, cardBParent, cardA, cardB, curScore, mult, highScore}) {
    const [isShowingHelp, setIsShowingHelp] = useState(false);

    // Holds the space of the currently placed card 
    const dummyCard = <DummyCard />;

    const helpScreen = <Help func={showHelp} />;


    function showHelp() {
        setIsShowingHelp(cur => !cur);
    }

    function formatScore(raw) {
      let renderScore = '';
      // Add leading 0s to score:
      if (raw <= 9) renderScore = '00' + raw;
      else if (raw >= 10 && raw <= 99) renderScore = '0' + raw;
      else renderScore = raw;  

      return renderScore;
    }

    return (
        <div className='playerspace-container'>
          {isShowingHelp ? helpScreen : null}
          <div className='playerspace-buttons'>
            <button className='help-button' onClick={showHelp}></button>
          </div>
          <div className='playerspace'>
            <div className='scorebug'>
              <div className='current-score'>SCORE: {formatScore(curScore)}</div>
              <div className='high-score'>HIGH: {formatScore(highScore)}</div>
            </div>
            <div className='current-mult'>MULTIPLIER BONUS: {mult}X</div>
            <div className='draw-pile-container'>
              <div className='draw-pile'>
                <div className='card-base-state'><div className='card-back-black'></div></div>
                <div className='card-base-state'><div className='card-back-black'></div></div>
                <div className='card-base-state'><div className='card-back-black'></div></div>
                <div className='card-base-state'><div className='card-back-black'></div></div>
              </div>

              <div className='draw-pile'>
                <div className='card-base-state'><div className='card-back-red'></div></div>
                <div className='card-base-state'><div className='card-back-red'></div></div>
                <div className='card-base-state'><div className='card-back-red'></div></div>
                <div className='card-base-state'><div className='card-back-red'></div></div>
              </div>
            </div>
            <div className='player-hand'>
              {/* Move the card back into playerspace if not related to a grid cell. */}
              {cardAParent === null ? cardA : dummyCard}
              {cardBParent === null ? cardB : dummyCard}
            </div>

            <div className='legend'></div>
          </div>
          <div className='playerspace-buttons'></div>
        </div>
    );
}

