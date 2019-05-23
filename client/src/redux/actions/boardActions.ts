import { CellValue } from '../reducers/boardReducer';

export const GAME_STARTED = 'GAME_STARTED';
export const gameStartedAction = (width: number, height: number, mineCount: number) => ({
  type: GAME_STARTED,
  payload: {
    width,
    height,
    mineCount,
  },
});

export const UPDATE_CELL_VALUES = 'UPDATE_CELL_VALUES';
export const updateCellValuesAction = (cellValueDiff: { index: number, value: CellValue }[]) => ({
  type: UPDATE_CELL_VALUES,
  payload: {
    cellValueDiff,
  },
});
