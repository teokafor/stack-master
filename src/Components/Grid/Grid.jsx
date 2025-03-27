import { GridCell } from '../GridCell/GridCell';

export function Grid({cardAParent, cardBParent, cardA, cardB}) {
    // Build an empty 5x5 array to represent grid cells
    const containers = Array.apply(null, Array(25)).map(function (x, i) { return 'grid-droppable-' + i; });
    
    return (
        <div className='grid-container'>
            <div className='grid-bg'></div>
            {
            // Populate grid
            containers.map((id) => (
                <GridCell id={id} key={id}>
                {/* Make card child of grid cell from drag end. */}
                {cardAParent === id ? cardA : null}
                {cardBParent === id ? cardB : null}
                </GridCell>))
            }</div>
    );
}