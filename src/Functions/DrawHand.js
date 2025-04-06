// Returns an random object containing card info (Shape and Multiplier value)
export function drawHand() {
    // Fixed probabilities
    let poolA = ['diamond', 'hexagon'];
    let poolB = ['circle'];
    let poolC = ['triangle', 'pentagon'];

    let poolD = ['hexagon_hollow', 'diamond_hollow'];

    let poolType = null;
    let pool = Math.floor(Math.random(1, 100) * 100);

    
    // Oops! All Triangles
    // let poolC = ['triangle', 'triangle']; 
    // pool = 99;


    if (pool <= 15) poolType = 'a';                      
    else if (pool > 15 && pool <= 40) poolType = 'b'; 	 
    else if (pool > 40 && pool <= 85) poolType = 'c';
    else if (pool > 85) poolType = 'd';

    switch (poolType) {
        case 'a': return {shape: poolA[Math.floor(Math.random(1,2) * 2)], mult: 4};
        case 'b': return {shape: poolB[0], mult: 0};
        case 'c': return {shape: poolC[Math.floor(Math.random(1,2) * 2)], mult: 2};
        case 'd': return {shape: poolD[Math.floor(Math.random(1, 2) * 2)], mult: 6}
    }

    // True random:
    // const pool = ['diamond', 'hexagon', 'circle', 'pentagon', 'triangle'];
    // const choice = Math.floor(Math.random() * 5);
    // console.log(choice);
    // return {shape: pool[choice], mult: 2};
}