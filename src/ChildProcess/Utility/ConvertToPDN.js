function ConvertToPDN(board) {
    const redPieces = [];
    const blackPieces = [];
    const squareMap = [];
    let squareNum = 1;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 !== 0) continue;      
            squareMap.push({ row, col, squareNum });       
            squareNum++;
        }
    }

    for (const { row, col, squareNum } of squareMap) {
        const cell = board[row][col];

        if (cell.includes('black')) 
            blackPieces.push(squareNum);
        else if (cell.includes('red')) 
            redPieces.push(squareNum);
        else if(cell.includes('queen') && cell.includes('red'))
            redPieces.push(`k${squareNum}`);
        else if(cell.includes('queen') && cell.includes('black'))
            blackPieces.push(`k${squareNum}`);
    }

    return `B:W${redPieces.join(',')}:B${blackPieces.join(',')}`;
}

module.exports = ConvertToPDN;