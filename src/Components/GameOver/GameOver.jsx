export function GameOver({func, isNewHighScore}) {
    return (
        <div className='game-over-screen'>
            <div className='header-text'>GAME OVER</div>
            {isNewHighScore ? <div className='new-high'>
                 <span>N</span>
                 <span>E</span>
                 <span>W</span>
                 <span>&nbsp;</span>
                 <span>H</span>
                 <span>I</span>
                 <span>G</span>
                 <span>H</span>
                 <span>&nbsp;</span>
                 <span>S</span>
                 <span>C</span>
                 <span>O</span>
                 <span>R</span>
                 <span>E</span>
                </div> : null }
            <button onClick={func} className='return-button'>PLAY AGAIN</button>
        </div>
    );
}

// NEW HIGH SCORE