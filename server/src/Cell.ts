export interface Boundaries {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
}

export enum PublicCellValue {
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Mine,
  Flag,
  Undiscovered,
}

export class Cell {
  private _index: number;
  private _boundaries: Boundaries;
  private _surroundingMinesCount: number;
  private _isDiscovered: boolean;
  private _isMine: boolean;
  private _isFlagged: boolean;

  constructor(index: number, boardWidth: number, boardHeight: number) {
    this._index = index;
    this._boundaries = this.generateBoundaries(boardWidth, boardHeight);
    this._surroundingMinesCount = 0;
    this._isDiscovered = false;
    this._isMine = false;
    this._isFlagged = false;
  }

  private generateBoundaries(width: number, height: number): Boundaries {
    return {
      up: this.index - width < 0,
      right: this.index % width === width - 1,
      down: this.index + width >= width * height,
      left: this.index % width === 0,
    };
  }

  get boundaries() { return this._boundaries; }
  get surroundingMinesCount() { return this._surroundingMinesCount; }
  get index() { return this._index; }
  get isDiscovered() { return this._isDiscovered; }
  get isMine() { return this._isMine; }
  get isFlagged() { return this._isFlagged; }
  get publicCellValue() {
    if (!this.isDiscovered) {
      if (this.isFlagged) {
        return PublicCellValue.Flag;
      }
      return PublicCellValue.Undiscovered;
    }
    if (this.isMine) {
      return PublicCellValue.Mine;
    }

    switch (this.surroundingMinesCount) {
      case 0:
        return PublicCellValue.Zero;
      case 1:
        return PublicCellValue.One;
      case 2:
        return PublicCellValue.Two;
      case 3:
        return PublicCellValue.Three;
      case 4:
        return PublicCellValue.Four;
      case 5:
        return PublicCellValue.Five;
      case 6:
        return PublicCellValue.Six;
      case 7:
        return PublicCellValue.Seven;
      case 8:
        return PublicCellValue.Eight;

      default:
        // Shouldn't ever get here
        return PublicCellValue.Eight;
    }
  }

  set surroundingMinesCount(value: number) { this._surroundingMinesCount = value; }
  set isDiscovered(value: boolean) { this._isDiscovered = value; }
  set isMine(value: boolean) { this._isMine = value; }
  set isFlagged(value: boolean) { this._isFlagged = value; }
}
