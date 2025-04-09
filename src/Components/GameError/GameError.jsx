import './GameError.css';

export function GameError({msg}) {
    return (
        <div className='game-error-body'><div className='game-error-msg'>{msg}</div></div>
    );
}