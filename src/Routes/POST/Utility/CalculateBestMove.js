

function getLegalMoves(board, playerColor) {
  const direction = playerColor === 'red' ? -1 : 1;         //red moves up, black moves down
  const opposingPlayer = playerColor === 'red' ? 'black' : 'red';
  const moves = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {

      const cell = board[row][col];

      if (cell.includes(playerColor)) {
            const moveSquares = {
                leftCorner: {row: row + direction, col: col - 1},
                rightCorner: {row: row + direction, col: col + 1},
            } 

            const kingMoveSquares = {
                topLeftCorner: {row: row + 1, col: col - 1},
                topRightCorner: {row: row + 1, col: col + 1},
                bottomLeftCorner: {row: row - 1, col: col - 1},
                bottomRightCorner: {row: row - 1, col: col + 1}
            }       
            const kingJumpSquares = {
                topLeftCorner: {row: row + 2, col: col - 2, capture: kingMoveSquares.topLeftCorner},
                topRightCorner: {row: row + 2, col: col + 2, capture: kingMoveSquares.topRightCorner},
                bottomLeftCorner: {row: row - 2, col: col - 2, capture: kingMoveSquares.bottomLeftCorner},
                bottomRightCorner: {row: row - 2, col: col + 2, capture: kingMoveSquares.bottomRightCorner}
            }                
            
            const jumpSquares = {
                leftCorner: {row: row + direction + direction, col: col - 2, capture: moveSquares.leftCorner},
                rightCorner: {row: row + direction + direction, col: col + 2, capture: moveSquares.rightCorner}
            }

                if(cell.includes('queen')){
                    for (const square of Object.values(kingMoveSquares)) {
                        const r = square.row;
                        const c = square.col;

                        if(board[r]?.[c] === ''){
                            moves.push({
                                from: {row, col},
                                to: {row: r, col: c},
                                piece: cell
                            });                    
                        }                     
                    }
                    for(const square of Object.values(kingJumpSquares)){
                        const r = square.row;
                        const c = square.col;
                        const capture = square.capture;

                        if (board[r]?.[c] === ''){
                            if(board[capture.row]?.[capture.col]?.includes(opposingPlayer)){
                                moves.push({
                                    capture: {...capture, pieceId: board[capture.row][capture.col]},
                                    from: {row, col},
                                    to: {row: r, col: c},
                                    piece: cell
                                })                        
                            }
                        }
                    } 
                }            
                else{
                    for (const square of Object.values(moveSquares)) {
                        const r = square.row;
                        const c = square.col;

                        if(r >= 0 && r < 8 && c >= 0 && c < 8 && board[r]?.[c] === ''){
                            moves.push({
                                from: {row, col},
                                to: {row: r, col: c},
                                piece: cell
                            });                    
                        }                     
                    }
                    for(const square of Object.values(jumpSquares)){
                        const r = square.row;
                        const c = square.col;
                        const capture = square.capture;

                        if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r]?.[c] === ''){
                            if(board[capture.row]?.[capture.col]?.includes(opposingPlayer)){
                                moves.push({
                                    capture: {...capture, pieceId: board[capture.row][capture.col]},
                                    from: {row, col},
                                    to: {row: r, col: c},
                                    piece: cell
                                })                        
                            }
                        }
                    }                      
                }      
            }
        }
    }

  return moves;
}

function evaluate(board, color) {
  const opposingColor = color === 'red' ? 'black' : 'red';
  let score = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell.includes(color)) 
        score += 1;
      else if(cell.includes(opposingColor))
        score -= 1;
    }
  }
  return score;
}



function applyMove(board, move) {
    const newBoard = board.map(row => [...row]);
    const from = move.from;
    const to = move.to;
    const capture = move.capture;
    const pieceId = move.piece;

    if(capture)
        newBoard[capture.row][capture.column] = '';

    newBoard[from.row][from.col] = '';
    newBoard[to.row][to.col] = pieceId;

    return newBoard;
}


function minimax(board, depth, maximizingPlayer, color) {  
    const player = maximizingPlayer ? 'red' : 'black';

    if (depth === 0) 
        return evaluate(board, color);
    
    
    const moves = getLegalMoves(board, player);

    if (maximizingPlayer) {
        let maxEval = -Infinity;               
        for (const move of moves) {
            const newBoard = applyMove(board, move);
            const _eval = minimax(newBoard, depth - 1, false, color);
            maxEval = Math.max(maxEval, _eval);           
        }
        return maxEval;
    } 
   else {
        let minEval = Infinity;
        for (const move of moves) {
            const newBoard = applyMove(board, move);
            const _eval = minimax(newBoard, depth - 1, true, color);
            minEval = Math.min(minEval, _eval);
        }
        return minEval;
    }
}

function findBestMove(board, depth, playerColor) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (const move of getLegalMoves(board, playerColor)) {
        if(move.capture) return move;
        const newBoard = applyMove(board, move);
        const score = minimax(newBoard, depth - 1, playerColor === 'red', playerColor);
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}

module.exports = findBestMove;