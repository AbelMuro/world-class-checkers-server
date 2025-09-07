/* 
    this is where i left off, i need to fix any bugs in the miniMax algorithm below

    im currently fixing the getLegalMoves() function, i need to fully test out the logic before going further
*/


function getLegalMoves(board, playerColor) {
  const direction = playerColor === 'red' ? -1 : 1;         //red moves up, black moves down
  const opposingPlayer = playerColor === 'red' ? 'black' : 'red';
  const moves = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {

      const cell = board[row][col];

      if (cell.startsWith(playerColor)) {
            const moveSquares = [
                [row + direction, col - 1],
                [row + direction, col + 1]
            ];

            const jumpSquares = [
                [row + direction + direction, col - 2],
                [row + direction + direction, col + 2]
            ]
            for (const [r, c] of moveSquares) {
                if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === ''){
                    moves.push({
                        from: {row, col},
                        to: {row: r, col: c},
                        piece: cell
                    });                    
                }                     
            }

            for(const [r, c] of jumpSquares){
                if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === ''){
                    if(board[r - direction]?.[c + direction]?.includes(opposingPlayer)){
                        moves.push({
                            capture: {row: r - direction, col: c + direction},
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
      if (cell.startsWith('red')) score += 1;
      if (cell.startsWith('black')) score -= 1;
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