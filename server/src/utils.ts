import { PublicCellValue } from './Cell';

export const generateBoardDiff = (prevValues: PublicCellValue[], values: PublicCellValue[]) => (
  prevValues.reduce<{ index: number; value: PublicCellValue}[]>(
    (acc, prevValue, index) => {
      if (prevValue === values[index]) {
        return acc;
      }

      return [...acc, { index, value: values[index] }];
    },
    [],
  )
);
