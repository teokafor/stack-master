let validSpaces = 0;

const validMatches = {
    'diamond': ['diamond', 'triangle'],
    'triangle': ['diamond', 'triangle', 'circle'],
    'circle': ['triangle', 'circle', 'pentagon'],
    'pentagon': ['circle', 'pentagon', 'hexagon'],
    'hexagon': ['pentagon', 'hexagon'],
    'hexagon_hollow': ['hexagon_hollow'],
    'diamond_hollow': ['diamond_hollow']
};

export function isGameOver(aType, bType, grid, blackouts) {
    validSpaces = 0;

    // Blackout spaces as numbers
    const truncatedBlackouts = blackouts.filter((str) => str.includes('blackout')).map((item) => Number(item.split('-').reverse()[0]));

    if (aType && bType && !aType.isDrawn && !bType.isDrawn) { 
        for (let cell in grid) {
            if (blackouts.includes(cell)) {
                if (grid[cell] === "") {
                    canPlaceRedInAdjacent(cell, truncatedBlackouts, grid, bType);
                } else if (grid[cell].props.color === 'r' && !grid[cell].props.isCleared &&
                           validMatches[aType.shape].includes(grid[cell].props.type.shape)) {
                    canPlaceRedInAdjacent(cell, truncatedBlackouts, grid, bType);
                }
            }
        }
        console.log(`game over check done. ${validSpaces} left.`);
        if (validSpaces === 0) console.log('game over!');
    }
}

function canPlaceRedInAdjacent(cell, truncatedBlackouts, grid, bType) {
    const containerId = Number(cell.split('-').reverse()[0]);
    let validContainers = [containerId - 4, containerId - 1, containerId + 1, containerId + 4];
    if (validContainers[2] % 4 === 0) validContainers.splice(2, 1);
    if ((validContainers[1] + 1) % 4 === 0) validContainers.splice(1, 1);
    validContainers = validContainers
    .filter((n) => n >= 0 && n <= 15)
    .filter((n) => !truncatedBlackouts.includes(n))
    .map((item) => 'grid-droppable-' + item);

    for (let cell of validContainers) {
        if (grid[cell] === "") {
            validSpaces += 1;
            continue;
        }

        if (grid[cell].props.color === 'b') {
            if (validMatches[bType.shape].includes(grid[cell].props.type.shape)) {
                validSpaces += 1;
            }
        }
    }
}
