import exactMath from "exact-math";
import { exactMathConfig } from "../constants/constants";

const mazeData = [
  [11, 9, 5, 5, 5, 5, 7, 9, 5, 7],
  [10, 10, 9, 1, 5, 5, 5, 4, 1, 7],
  [10, 10, 10, 12, 7, 13, 5, 1, 0, 6],
  [10, 10, 10, 9, 1, 1, 3, 10, 8, 7],
  [10, 10, 10, 8, 0, 0, 2, 10, 8, 3],
  [10, 10, 10, 8, 0, 0, 2, 10, 10, 10],
  [10, 10, 10, 12, 4, 4, 4, 6, 10, 10],
  [12, 0, 4, 5, 5, 3, 9, 3, 10, 10],
  [9, 6, 9, 1, 5, 6, 10, 10, 10, 10, 10],
  [12, 4, 6, 12, 5, 5, 6, 12, 6, 14]
];

export const getMazeData = () => {
  return mazeData;
};

export const hasLeftWall = cell => {
  return [15, 14, 13, 12, 11, 10, 9, 8].includes(cell);
};

export const hasRightWall = cell => {
  return [15, 14, 11, 10, 7, 6, 3, 2].includes(cell);
};

export const hasTopWall = cell => {
  return [15, 13, 11, 9, 7, 5, 3, 1].includes(cell);
};

export const hasBottomWall = cell => {
  return [15, 14, 13, 12, 7, 6, 5, 4].includes(cell);
};

export const getUpdatedMazePosition = (
  mazePosition,
  prevPlayerPosition,
  newPlayerPosition
) => {
  const playerMovementX = exactMath.add(
    prevPlayerPosition[0],
    -newPlayerPosition[0],
    exactMathConfig
  );
  const playerMovementY = exactMath.add(
    prevPlayerPosition[1],
    newPlayerPosition[1],
    exactMathConfig
  );
  return [
    exactMath.sub(
      mazePosition[0],
      Math.round(playerMovementX).toFixed(2),
      exactMathConfig
    ),
    exactMath.sub(
      mazePosition[1],
      Math.round(playerMovementY).toFixed(2),
      exactMathConfig
    )
  ];
};

/*
0, 0

cellsData: [
    null,
    mazeData[mazeWidthAndHeight - 2][0],
    mazeData[mazeWidthAndHeight - 2][1],
    null,
    mazeData[mazeWidthAndHeight - 1][0],
    mazeData[mazeWidthAndHeight - 1][1],
    null,
    null,
    null
  ]

  1, 0 

  null,
  mazeData[mazeWidthAndHeight - 3][0],
  mazeData[mazeWidthAndHeight - 3][1],
  null,
  mazeData[mazeWidthAndHeight - 2][0],
  mazeData[mazeWidthAndHeight - 2][1],
  null,
  mazeData[mazeWidthAndHeight - 1][0],
  mazeData[mazeWidthAndHeight - 1][1]


1, 1

null,
mazeData[mazeWidthAndHeight - 3][1],
mazeData[mazeWidthAndHeight - 3][2],
null,
mazeData[mazeWidthAndHeight - 2][1],
mazeData[mazeWidthAndHeight - 2][2],
null,
mazeData[mazeWidthAndHeight - 1][1],
mazeData[mazeWidthAndHeight - 1][2]
*/
