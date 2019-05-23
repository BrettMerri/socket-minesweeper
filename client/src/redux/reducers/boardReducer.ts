import { GAME_STARTED, UPDATE_CELL_VALUES } from '../actions/boardActions';
import { Reducer } from 'redux';

export enum CellValue {
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

export type GameState = 'NOT_STARTED' | 'IN_PROGRESS' | 'WON' | 'LOST';

export interface BoardState {
  width: number;
  height: number;
  mineCount: number;
  cellValues: CellValue[];
  gameState: GameState;
}

export const initialState: BoardState = {
  width: 0,
  height: 0,
  mineCount: 0,
  cellValues: [],
  gameState: 'NOT_STARTED',
};

const boardReducer: Reducer<BoardState> = (
  state = initialState,
  action,
): BoardState => {
  switch (action.type) {
    case GAME_STARTED:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        mineCount: action.payload.mineCount,
        cellValues: Array(action.payload.width * action.payload.height).fill(CellValue.Undiscovered),
        gameState: 'IN_PROGRESS',
      };

    case UPDATE_CELL_VALUES:
      return {
        ...state,
        cellValues: state.cellValues.map((cellValue, cellIndex) => {
          const cellValueDiff = action.payload.cellValueDiff.find(({ index }: { index: number }) => index === cellIndex);
          if (cellValueDiff === undefined) {
            return cellValue;
          }
          return cellValueDiff.value;
        }),
      };

    default:
      return state;
  }
};

export default boardReducer;
