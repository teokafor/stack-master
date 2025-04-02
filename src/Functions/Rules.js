export function checkCardinality(cardId, currentContainer, cardAParent, cardBParent) {
    let otherContainer = cardId === 'active-card-a' ? cardBParent : cardAParent; // Get container of already placed card.
    let containerId = Number(otherContainer.split('-').reverse()[0]); // Grab id of already placed card.
    let validContainers = [containerId - 5, containerId - 1, containerId + 1, containerId + 5]; // Create array of legal positions based on already placed card.
    if (validContainers[2] % 5 === 0) validContainers.splice(2, 1); // Prevent placement of consecutive edge cards.
    if ((validContainers[1] + 1) % 5 === 0) validContainers.splice(1, 1);
    validContainers = validContainers.filter((n) => n >= 0 && n <= 24).map((item) => 'grid-droppable-' + item); // Remove OOB positions and format id.
    return validContainers.includes(currentContainer) ? true : false; // Return true if desired move is cardinal to other card.
}

export function checkShapes(curCardId, placedCardId, cardA, cardB, grid) {
    const curCard = curCardId === 'active-card-a' ? cardA : cardB;
    const placedCard = grid[placedCardId];

    const validMatches = {
        'diamond': ['diamond', 'triangle'],
        'triangle': ['diamond', 'triangle', 'circle'],
        'circle': ['triangle', 'circle', 'pentagon'],
        'pentagon': ['circle', 'pentagon', 'hexagon'],
        'hexagon': ['pentagon', 'hexagon']
    };

    if (placedCard !== '') {
        if (validMatches[curCard.props.children.props.type.shape].includes(placedCard.props.type.shape)) return true;
        else return false;
    }
    return true;
}

export function checkColor(curCardId, placedCardId, cardA, cardB, grid) {
    const curCard = curCardId === 'active-card-a' ? cardA : cardB;
    const placedCard = grid[placedCardId];

    if (placedCard !== '' && curCard.props.children.props.color === placedCard.props.color) return false;
    else return true;
}

export function calculateScore(curCardId, placedCardId, cardA, cardB, grid, setScoreA, setScoreB) {
    const curCard = curCardId === 'active-card-a' ? cardA : cardB;
    const placedCard = grid[placedCardId];

    // Clear score if previously legal score, then was moved.
    if (curCardId === 'active-card-a' && placedCard === '') setScoreA(0);
    if (curCardId === 'active-card-b' && placedCard === '') setScoreB(0);

    // Check for color. Returns false if not met.
    if (placedCard !== '') {
        if (curCardId === 'active-card-a') setScoreA(curCard.props.children.props.type.mult * placedCard.props.type.mult);
        else setScoreB(curCard.props.children.props.type.mult * placedCard.props.type.mult);
    }
    return true;
}