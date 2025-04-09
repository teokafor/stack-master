export function GameOver({func, isNewHighScore}) {
    return (
        <div className='game-over-screen'>
            <div className='header-text'>GAME OVER</div>
            {isNewHighScore ? <div className='new-high'>NEW HIGH SCORE</div> : null }
            <button onClick={func} className='return-button'>PLAY AGAIN</button>
        </div>
    );
}