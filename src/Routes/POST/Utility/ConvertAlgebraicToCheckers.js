function ConvertAlgebraicToCheckers(move) {
  const chessToCheckers = {
      b8: 1,  d8: 2,  f8: 3,  h8: 4,
      a7: 5,  c7: 6,  e7: 7,  g7: 8,
      b6: 9,  d6: 10, f6: 11, h6: 12,
      a5: 13, c5: 14, e5: 15, g5: 16,
      b4: 17, d4: 18, f4: 19, h4: 20,
      a3: 21, c3: 22, e3: 23, g3: 24,
      b2: 25, d2: 26, f2: 27, h2: 28,
      a1: 29, c1: 30, e1: 31, g1: 32
  };
  const from = move.slice(0, 2);
  const to = move.slice(2, move.length);

  return `${chessToCheckers[from]} ${chessToCheckers[to]}`;                                            
}

module.exports = ConvertAlgebraicToCheckers;