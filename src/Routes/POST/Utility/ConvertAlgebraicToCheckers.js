function ConvertAlgebraicToCheckers(file, rank) {
  const darkSquareRanks = [1, 2, 3, 4, 5, 6, 7, 8];             
  const darkSquareFiles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];   //columns
  const index = darkSquareRanks.indexOf(rank) * 4 + darkSquareFiles.indexOf(file);
  return index + 1; // checkers squares are 1-indexed
}

module.exports = ConvertAlgebraicToCheckers;