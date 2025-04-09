import { GridCell } from '../GridCell/GridCell';
import { GameOver } from '../GameOver/GameOver';
import { GameError } from '../GameError/GameError';

import './Grid.css';

export function Grid({cardAParent, cardBParent, cardA, cardB, grid, containers, chainToastA, chainToastB, isGameOver, resetFunc, isNewHighScore, errorMsg}) {    

    if (chainToastA === null) chainToastA = {'props': {id: 'pass'}};
    if (chainToastB === null) chainToastB = {'props': {id: 'pass'}};

    const gameOverScreen = <GameOver func={resetFunc} isNewHighScore={isNewHighScore} />;
    const gameError = <GameError msg={errorMsg} />

    console.log(errorMsg);

    let keyArr = Object.keys(grid);    
    return (
        <div className='grid-container'>
            {errorMsg !== '' ? gameError : null}
            {isGameOver ? gameOverScreen : null} 
            <div className='grid-bg'></div>
            {
            // Populate grid
            containers.map((id, ind) => (
                <GridCell id={id} key={id}>
                    {keyArr[ind] === id && grid[id] !== '' ? grid[id] : null}
                    {chainToastA.props.id === id ? chainToastA : null}
                    {chainToastB.props.id === id ? chainToastB : null}

                    {/* Make card child of grid cell from handleDragEnd. */}
                    {cardAParent === id ? cardA : null}
                    {cardBParent === id ? cardB : null}

                </GridCell>))
            }</div>
    );
}