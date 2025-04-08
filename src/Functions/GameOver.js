export function isGameOver(aType, bType, grid, blackouts) {

    // console.log(grid);
    // console.log(blackouts);
    /*

    16 possible spaces:
    Take card A:
        eliminate blackout tiles (-5 possible spaces)
        eliminate black tiles (-n possible tiles)

        foreach valid space:
            "place" red card in 4 possible spaces.

    I don't think we'd need a second algo for card B?
    If we exhaust every possible space for card A, then there's no point in checking card B.



    typeA, typeB, grid, blackouts

    iterate through grid (item, ind, arr)
        
        if grid item === "" && not blackout >> this tile is clear, move to check adjacents.


        if item !== ""
            if item.props.color === 'r'
                if validShapes[item.props.type.shape].includes(typeA.shape)
                    check -4, -1, +1, & +4 for emptiness,color,shape

    */
    const validMatches = {
        'diamond': ['diamond', 'triangle'],
        'triangle': ['diamond', 'triangle', 'circle'],
        'circle': ['triangle', 'circle', 'pentagon'],
        'pentagon': ['circle', 'pentagon', 'hexagon'],
        'hexagon': ['pentagon', 'hexagon'],
        'hexagon_hollow': ['hexagon_hollow'],
        'diamond_hollow': ['diamond_hollow']
    };

    if (aType && bType) {
        if (!aType.isDrawn && !bType.isDrawn) {
            for (let item in grid) {
                if (grid[item] === "" && blackouts.includes(item)) {
                    console.log(`${item} is empty`);
                    continue;
                }
        
                if (blackouts.includes(item)) {
                    if (grid[item] !== "") {
                        if (grid[item].props.color === 'r') {
                            if (!grid[item].props.isCleared) {
                                if (validMatches[aType.shape].includes(grid[item].props.type.shape)) console.log(`Can place at ${item}`)
                            }
                        }
                    }
                }
            }
        }
    }
    


}