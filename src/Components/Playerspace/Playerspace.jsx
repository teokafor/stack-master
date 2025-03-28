import { DummyCard } from "../Card/Card";

export function Playerspace({cardAParent, cardBParent, cardA, cardB}) {
    // Holds the space of the currently placed card 
    const dummyCard = <DummyCard />

    return (
        <div className='playerspace-container'>
          <div className='playerspace'>
            <div className='scorebug'>
              <div className='current-score'>SCORE: 000</div>
              <div className='high-score'>HIGH: 000</div>
            </div>
            <div className='draw-pile-container'>
              <div className='card-base-state'>
                <div className='card-back-black'></div>
              </div>

              <div className='card-base-state'>
                <div className='card-back-red'></div>
              </div>
            </div>
            <div className='player-hand'>
              {/* Move the card back into playerspace if not related to a grid cell. */}
              {cardAParent === null ? cardA : dummyCard}
              {cardBParent === null ? cardB : dummyCard}
            </div>
          </div>
        </div>
    );
}