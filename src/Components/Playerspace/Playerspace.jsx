import { DummyCard } from "../Card/Card";

export function Playerspace({cardAParent, cardBParent, cardA, cardB, curScore, mult}) {
    // Holds the space of the currently placed card 
    const dummyCard = <DummyCard />


    let renderScore = '';
    // Add leading 0s to score:
    if (curScore <= 9) renderScore = '00' + curScore;
    else if (curScore >= 10 && curScore <= 99) renderScore = '0' + curScore;
    else renderScore = curScore;

    return (
        <div className='playerspace-container'>
          <div className='playerspace'>
            <div className='scorebug'>
              <div className='current-score'>SCORE: {renderScore}</div>
              <div className='high-score'>HIGH: 000</div>
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
        </div>
    );
}