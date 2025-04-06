import { GridCell } from '../GridCell/GridCell';

export function Grid({cardAParent, cardBParent, cardA, cardB, grid, containers, chainToastA, chainToastB}) {    

    if (chainToastA === null) chainToastA = {'props': {id: 'pass'}};
    if (chainToastB === null) chainToastB = {'props': {id: 'pass'}};

    let keyArr = Object.keys(grid);    
    return (
        <div className='grid-container'>
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