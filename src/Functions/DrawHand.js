export function drawHand() {
    let poolA = ['dia', 'hex'];
    let poolB = ['cir'];
    let poolC = ['tri', 'pen'];
    let pool = Math.floor(Math.random(1, 100) * 100);
    let poolType = null;

    if (pool <= 15) poolType = 'a';                     // 10% true
    else if (pool > 15 && pool <= 35) poolType = 'b'; 	// 20% true
    else if (pool > 35) poolType = 'c';                 // 30% true

    switch (poolType) {
        case 'a': return poolA[Math.floor(Math.random(1,2) * 2)];
        case 'b': return poolB[0];
        case 'c': return poolC[Math.floor(Math.random(1,2) * 2)];
    }
}