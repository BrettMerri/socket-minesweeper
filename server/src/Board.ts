import { Cell, PublicCellValue } from './Cell';

export enum BoardState {
  NOT_STARTED,
  IN_PROGRESS,
  WON,
  LOST,
}

class Board {
  private _width: number;
  private _mineCount: number;
  private _cells: Cell[];
  private _boardState: BoardState;

  public constructor(width: number, height: number, mineCount: number) {
    this._width = width;
    this._mineCount = mineCount;
    this._cells = Array(width * height).fill(null).map((_, index) => new Cell(index, width, height));
    this._boardState = BoardState.NOT_STARTED;
  }

  public selectCell(cellIndex: number) {
    const selectedCell = this._cells[cellIndex];

    if (selectedCell.isDiscovered) {
      return;
    }

    selectedCell.isDiscovered = true;

    if (this._boardState === BoardState.NOT_STARTED) {
      this.generateCellValues(selectedCell);
      this._boardState = BoardState.IN_PROGRESS;
    }

    if (selectedCell.isMine) {
      this._boardState = BoardState.LOST;
      this._cells.forEach((cell) => {
        cell.isDiscovered = true;
      });
    }

    if (selectedCell.surroundingMinesCount === 0) {
      this.discoverSurroundingMines(selectedCell);
    }
  }

  public flagCell(cellIndex: number) {
    const selectedCell = this._cells[cellIndex];

    if (selectedCell.isDiscovered) {
      return;
    }

    selectedCell.isFlagged = !selectedCell.isFlagged;
  }

  private generateCellValues(selectedCell: Cell) {
    const whitelistedCells = this.getSurroundingCells(selectedCell);
    const whitelistedCellIndices = whitelistedCells.map(cell => cell.index);
    const candidateCells = this._cells.filter(cell => !whitelistedCellIndices.includes(cell.index));

    for (let i = 0; i < this._mineCount; i++) {
      const randomIndex = Math.floor(Math.random() * candidateCells.length);
      const candidateCell = candidateCells[randomIndex];
      candidateCells.splice(randomIndex, 1);
      candidateCell.isMine = true;
      const surroundingCells = this.getSurroundingCells(candidateCell);
      surroundingCells.forEach(cell => cell.surroundingMinesCount++);
    }
  }

  private discoverSurroundingMines(cell: Cell) {
    const surroundingCells = this.getSurroundingCells(cell);
    surroundingCells.forEach((surroundingCell) => {
      if (surroundingCell.isDiscovered || surroundingCell.isFlagged) {
        return;
      }

      surroundingCell.isDiscovered = true;

      if (surroundingCell.surroundingMinesCount !== 0) {
        return;
      }

      this.discoverSurroundingMines(surroundingCell);
    });
  }

  private getSurroundingCells(cell: Cell) {
    const surroundingCells = [];

    if (!cell.boundaries.up) {
      const cellIndexUp = cell.index - this._width;
      surroundingCells.push(this._cells[cellIndexUp]);

      if (!cell.boundaries.right) {
        const cellIndexUpRight = cell.index - this._width + 1;
        surroundingCells.push(this._cells[cellIndexUpRight]);
      }
    }

    if (!cell.boundaries.right) {
      const cellIndexRight = cell.index + 1;
      surroundingCells.push(this._cells[cellIndexRight]);

      if (!cell.boundaries.down) {
        const cellIndexDownRight = cell.index + this._width + 1;
        surroundingCells.push(this._cells[cellIndexDownRight]);
      }
    }

    if (!cell.boundaries.down) {
      const cellIndexDown = cell.index + this._width;
      surroundingCells.push(this._cells[cellIndexDown]);

      if (!cell.boundaries.left) {
        const cellIndexDownLeft = cell.index + this._width - 1;
        surroundingCells.push(this._cells[cellIndexDownLeft]);
      }
    }

    if (!cell.boundaries.left) {
      const cellIndexLeft = cell.index - 1;
      surroundingCells.push(this._cells[cellIndexLeft]);

      if (!cell.boundaries.up) {
        const cellIndexUpLeft = cell.index - this._width - 1;
        surroundingCells.push(this._cells[cellIndexUpLeft]);
      }
    }

    return surroundingCells;
  }

  public get width() { return this._width; }
  public get mineCount() { return this._mineCount; }
  public get cells() { return this._cells; }
  public get boardState() { return this._boardState; }
  public get publicCellValues() {
    return this._cells.map(cell => cell.publicCellValue);
  }
}

export default Board;
