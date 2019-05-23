import Board, { BoardState } from '../src/Board';
import { PublicCellValue } from '../src/Cell';

test('Board constructor', () => {
  const board = new Board(8, 8, 10);
  expect(board.width).toBe(8);
  expect(board.boardState).toBe(BoardState.NOT_STARTED);
  expect(board.mineCount).toBe(10);
  expect(board.cells).toHaveLength(8 * 8);

  const publicCellValues = board.publicCellValues;
  const allCellsUndiscovered = publicCellValues.every(publicCellValue => (
    publicCellValue === PublicCellValue.Undiscovered
  ));

  expect(allCellsUndiscovered).toBe(true);
});

// ---------------------
// | 0  | 1  | 2  | 3  |
// |----+----+----+----|
// | 4  | 5  | 6  | 7  |
// |----+----+----+----|
// | 8  | 9  | 10 | 11 |
// |----+----+----+----|
// | 12 | 13 | 14 | 15 |
// ---------------------

test('Board getSurroundingCells', () => {
  const board = new Board(4, 4, 0);
  const cells = board.cells;

  // No boundaries
  // @ts-ignore
  const result1 = board.getSurroundingCells(cells[5]).sort((a, b) => a.index - b.index);
  const expected1 = [
    cells[0],
    cells[1],
    cells[2],
    cells[4],
    cells[6],
    cells[8],
    cells[9],
    cells[10],
  ];
  expect(result1).toStrictEqual(expected1);

  // Up boundary
  // @ts-ignore
  const result2 = board.getSurroundingCells(cells[1]).sort((a, b) => a.index - b.index);
  const expected2 = [
    cells[0],
    cells[2],
    cells[4],
    cells[5],
    cells[6],
  ];
  expect(result2).toStrictEqual(expected2);

  // Right boundary
  // @ts-ignore
  const result3 = board.getSurroundingCells(cells[7]).sort((a, b) => a.index - b.index);
  const expected3 = [
    cells[2],
    cells[3],
    cells[6],
    cells[10],
    cells[11],
  ];
  expect(result3).toStrictEqual(expected3);

  // Down boundary
  // @ts-ignore
  const result4 = board.getSurroundingCells(cells[14]).sort((a, b) => a.index - b.index);
  const expected4 = [
    cells[9],
    cells[10],
    cells[11],
    cells[13],
    cells[15],
  ];
  expect(result4).toStrictEqual(expected4);

  // Left boundary
  // @ts-ignore
  const result5 = board.getSurroundingCells(cells[4]).sort((a, b) => a.index - b.index);
  const expected5 = [
    cells[0],
    cells[1],
    cells[5],
    cells[8],
    cells[9],
  ];
  expect(result5).toStrictEqual(expected5);

  // Up-Right boundary
  // @ts-ignore
  const result6 = board.getSurroundingCells(cells[3]).sort((a, b) => a.index - b.index);
  const expected6 = [
    cells[2],
    cells[6],
    cells[7],
  ];
  expect(result6).toStrictEqual(expected6);

  // Down-Right boundary
  // @ts-ignore
  const result7 = board.getSurroundingCells(cells[15]).sort((a, b) => a.index - b.index);
  const expected7 = [
    cells[10],
    cells[11],
    cells[14],
  ];
  expect(result7).toStrictEqual(expected7);

  // Down-Left boundary
  // @ts-ignore
  const result8 = board.getSurroundingCells(cells[12]).sort((a, b) => a.index - b.index);
  const expected8 = [
    cells[8],
    cells[9],
    cells[13],
  ];
  expect(result8).toStrictEqual(expected8);

  // Up-Left boundary
  // @ts-ignore
  const result9 = board.getSurroundingCells(cells[0]).sort((a, b) => a.index - b.index);
  const expected9 = [
    cells[1],
    cells[4],
    cells[5],
  ];
  expect(result9).toStrictEqual(expected9);
});
