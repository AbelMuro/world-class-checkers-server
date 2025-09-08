

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

            const jumpSquares = {
                leftCorner: {row: row + direction + direction, col: col - 2, capture: moveSquares.leftCorner},
                rightCorner: {row: row + direction + direction, col: col + 2, capture: moveSquares.rightCorner}
            }

            for (const square of Object.values(moveSquares)) {
                const r = square.row;
                const c = square.col;

                if(r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === ''){
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

                if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === ''){
                    if(board[capture.row]?.[capture.col]?.includes(opposingPlayer)){
                        console.log(capture);
                        moves.push({
                            capture: {...capture, pieceId: board[capture.row][capture.col]},
                            from: {row, col},
                            to: {row: r, col: c},
                            piece: cell
                        })                        
                    }
                }
            }

        // TODO: add king movement
      }
    }
  }

  return moves;
}

function evaluate(board) {
  let score = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.includes('red')) score += 1;
      if (cell.includes('black')) score -= 1;
    }
  }
  return score;
}



function applyMove(board, move) {
    const newBoard = board.map(row => [...row]);
    const from = move.from;
    const to = move.to;
    const capture = move.capture;

    if(capture)
        newBoard[capture.row][capture.column] = '';
    
    newBoard[from.row][from.col] = move.piece;
    newBoard[to.row][to.col] = '';
    

    // TODO: king promotion
    return newBoard;
}


function minimax(board, depth, maximizingPlayer) {
    if (depth === 0) 
        return evaluate(board);
    
    const player = maximizingPlayer ? 'red' : 'black';
    const moves = getLegalMoves(board, player);

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (const move of moves) {
            const newBoard = applyMove(board, move);
            const eval = minimax(newBoard, depth - 1, false);
            maxEval = Math.max(maxEval, eval);
        }
        return maxEval;
    } 
   else {
        let minEval = Infinity;
        for (const move of moves) {
            const newBoard = applyMove(board, move);
            const eval = minimax(newBoard, depth - 1, true);
            minEval = Math.min(minEval, eval);
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
        const score = minimax(newBoard, depth - 1, false);
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
}

module.exports = findBestMove;