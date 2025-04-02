import { GridCell } from '../GridCell/GridCell';

export function Grid({cardAParent, cardBParent, cardA, cardB, grid, containers}) {    
    // Build an empty 5x5 array to represent grid cells
    let containers = Array.apply(null, Array(25)).map(function (x, i) { return 'grid-droppable-' + i; });

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