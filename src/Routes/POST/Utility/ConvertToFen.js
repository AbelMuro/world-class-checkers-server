function ConvertToFen(board) {
  const white = [];
  const black = [];
  const squareMap = [
    [1, null, 2, null, 3, null, 4, null],
    [null, 5, null, 6, null, 7, null, 8],
    [9, null, 10, null, 11, null, 12, null],
    [null, 13, null, 14, null, 15, null, 16],
    [17, null, 18, null, 19, null, 20, null],
    [null, 21, null, 22, null, 23, null, 24],
    [25, null, 26, null, 27, null, 28, null],
    [null, 29, null, 30, null, 31, null, 32]
  ];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = board[row][col];
      if (cell.includes('red')) white.push(squareMap[row][col]);
      if (cell.includes('black')) black.push(squareMap[row][col]);
    }
  }
  return `B:W${white.join(',')}:B${black.join(',')}`;
}

module.exports = ConvertToFen;