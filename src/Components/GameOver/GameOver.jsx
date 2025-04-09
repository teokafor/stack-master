export function GameOver({func}) {
    return (
        <div className='game-over-screen'>
            <div className='header-text'>GAME OVER</div>
            <div className='new-high'>NEW HIGH SCORE</div>
            <button onClick={func} className='return-button'>PLAY AGAIN</button>
        </div>
    );
}