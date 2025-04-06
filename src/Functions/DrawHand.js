// Returns an random object containing card info (Shape and Multiplier value)
export function drawHand() {
    // Fixed probabilities
    let poolA = ['diamond', 'hexagon'];
    let poolB = ['circle'];
    // let poolC = ['triangle', 'pentagon'];

    let poolType = null;
    let pool = Math.floor(Math.random(1, 100) * 100);

    
    // Oops! All Triangles
    let poolC = ['triangle', 'triangle']; 
    pool = 99;

    

    if (pool <= 15) poolType = 'a';                      
    else if (pool > 15 && pool <= 35) poolType = 'b'; 	 
    else if (pool > 35) poolType = 'c';                 
    switch (poolType) {
        case 'a': return {shape: poolA[Math.floor(Math.random(1,2) * 2)], mult: 4};
        case 'b': return {shape: poolB[0], mult: 0};
        case 'c': return {shape: poolC[Math.floor(Math.random(1,2) * 2)], mult: 2};
    }

    // True random:
    // const pool = ['diamond', 'hexagon', 'circle', 'pentagon', 'triangle'];
    // const choice = Math.floor(Math.random() * 5);
    // console.log(choice);
    // return {shape: pool[choice], mult: 2};
}