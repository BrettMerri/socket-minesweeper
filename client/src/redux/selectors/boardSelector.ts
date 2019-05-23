import { RootState } from '../reducers';
import { BoardState, GameState, CellValue } from '../reducers/boardReducer';

export const selectBoard = (state: RootState): BoardState => state.board;

export const selectBoardWidth = (state: RootState): number => selectBoard(state).width;
export const selectBoardHeight = (state: RootState): number => selectBoard(state).height;
export const selectBoardMineCount = (state: RootState): number => selectBoard(state).mineCount;
export const selectBoardCellValues = (state: RootState): CellValue[] => selectBoard(state).cellValues;
export const selectBoardGameState = (state: RootState): GameState => selectBoard(state).gameState;
export const selectBoardCellValuesByIndex = (state: RootState, index: number): CellValue | undefined => (
  selectBoardCellValues(state)[index]
);
