import { mazeWidthAndHeight } from "../constants/constants";
const initialRowIndex = mazeWidthAndHeight - 2;
const initialColumnIndex = 1;

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

const getDistance = (multiple, subtract, cellWidth) => {
  const fraction = Math.abs(multiple) % 1;
  if (subtract) {
    return cellWidth - fraction * cellWidth;
  }
  return fraction * cellWidth;
};

const getIndex = (multiples, subtract, initial) => {
  if (subtract) {
    return initial - Math.ceil(multiples);
  }
  return initial + Math.ceil(multiples);
};

const getMultiplesOfCellWidthOutsideZone = (playerPosition, layoutWidth) => {
  const cellWidth = layoutWidth / 3;
  const movementIsPositive = playerPosition > 0;
  const normalizedPlayerPosition = movementIsPositive
    ? playerPosition - cellWidth
    : Math.abs(playerPosition);
  return normalizedPlayerPosition / cellWidth;
};

export const getActiveMazeZoneData = (playerPosition, layoutWidth) => {
  const cellWidth = layoutWidth / 3;

  const halfOfCellWidth = cellWidth / 2;

  const initialZone = {
    right: 50 + halfOfCellWidth,
    left: 50 - halfOfCellWidth,
    top: 50 + halfOfCellWidth,
    bottom: 50 - halfOfCellWidth
  };

  const isInsideInitialZoneX =
    playerPosition[0] < initialZone.right &&
    playerPosition[0] > initialZone.left;

  const isInsideInitialZoneY =
    playerPosition[1] < initialZone.top &&
    playerPosition[1] > initialZone.bottom;

  const isLeftOfInitialZone = playerPosition[0] < initialZone.left;

  const isRightOfInitialZone = playerPosition[0] > initialZone.right;

  const isAboveInitialZone = playerPosition[1] > initialZone.top;

  const multiplesX = getMultiplesOfCellWidthOutsideZone(
    playerPosition[0],
    layoutWidth
  );

  const multiplesY = getMultiplesOfCellWidthOutsideZone(
    playerPosition[1],
    layoutWidth
  );

  const mazeZoneColumnIndex = isInsideInitialZoneX
    ? initialColumnIndex
    : getIndex(multiplesX, isLeftOfInitialZone, initialColumnIndex);

  const mazeZoneRowIndex = isInsideInitialZoneY
    ? initialRowIndex
    : getIndex(multiplesY, isAboveInitialZone, initialRowIndex);

  const cell = mazeData[mazeZoneRowIndex][mazeZoneColumnIndex];

  const distanceToTop = getDistance(multiplesY, isAboveInitialZone, cellWidth);

  const distanceToRight = getDistance(
    multiplesX,
    isRightOfInitialZone,
    cellWidth
  );

  const activeMazeZoneData = {
    distanceToTopWall: hasTopWall(cell) ? distanceToTop : null,
    distanceToBottomWall: hasBottomWall(cell)
      ? cellWidth - distanceToTop
      : null,
    distanceToRightWall: hasRightWall(cell) ? distanceToRight : null,
    distanceToLeftWall: hasLeftWall(cell) ? cellWidth - distanceToRight : null
  };

  return activeMazeZoneData;
};
