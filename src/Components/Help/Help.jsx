import './Help.css';

export function Help({func}) {
    return (
        <div className='help-screen'>
            <div className='header-text'>HOW TO PLAY</div>
            <div className='subheader-text'>OBJECTIVE</div>
            <div className='body-text'>Drag cards onto valid spaces on the board. Placing cards on top of other cards grants points based on the values of each card. Circle cards grant no points. The game is over when no more moves are available with the current hand.</div>
            <div className='subheader-text'>RULES</div>
            <div className='body-text'>Card placement must be adjacent.<br />
            Cards can only be placed on to adjacent shapes.<br />
            Cards can only be placed on to different colors<br />
            Consecutive clears grants a chain bonus (up to x5.)</div>
            <button onClick={func} className='return-button'>OKAY</button>
        </div>
    );
}