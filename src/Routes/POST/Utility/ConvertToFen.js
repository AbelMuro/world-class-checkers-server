function ConvertToFen(board) {
  const white = [];
  const black = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = board[row][col];
      const squareNum = row * 4 + Math.floor(col / 2) + 1;
      if (cell.includes('red')) white.push(squareNum);
      if (cell.includes('black')) black.push(squareNum);
    }
  }
  return `B:W${white.join(',')}:B${black.join(',')}`;
}

module.exports = ConvertToFen;