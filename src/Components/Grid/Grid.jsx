import { GridCell } from '../GridCell/GridCell';

export function Grid({cardAParent, cardBParent, cardA, cardB, grid, containers}) {    
    let keyArr = Object.keys(grid);    
    return (
        <div className='grid-container'>
            <div className='grid-bg'></div>
            {
            // Populate grid
            containers.map((id, ind) => (
                <GridCell id={id} key={id}>
                    {keyArr[ind] === id && grid[id] !== '' ? grid[id] : null}
                    {/* Make card child of grid cell from handleDragEnd. */}
                    {cardAParent === id ? cardA : null}
                    {cardBParent === id ? cardB : null}
                </GridCell>))
            }</div>
    );
}