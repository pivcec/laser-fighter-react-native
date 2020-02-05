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

export const hasWestWall = cell => {
  return [15, 14, 13, 12, 11, 10, 9, 8].includes(cell);
};

export const hasEastWall = cell => {
  return [15, 14, 11, 10, 7, 6, 3, 2].includes(cell);
};

export const hasNorthWall = cell => {
  return [15, 13, 11, 9, 7, 5, 3, 1].includes(cell);
};

export const hasSouthWall = cell => {
  return [15, 14, 13, 12, 7, 6, 5, 4].includes(cell);
};

const getRowIndex = (north, south, initialRowIndex) => {
  if (north) {
    return initialRowIndex - north;
  }

  if (south) {
    return initialRowIndex + south;
  }

  return initialRowIndex;
};

const getColumnIndex = (east, west, initialColumnIndex) => {
  if (east) {
    return initialColumnIndex + east;
  }

  if (west) {
    return initialColumnIndex - west;
  }

  return initialColumnIndex;
};

const getMazeMovement = mazePosition => {
  const mazeMovementX = 0 - mazePosition[0];
  const mazeMovementY = 0 - mazePosition[1];

  return {
    west: mazeMovementX > 0 ? null : Math.abs(mazeMovementX),
    east: mazeMovementX < 0 ? null : mazeMovementX,
    south: mazeMovementY > 0 ? null : Math.abs(mazeMovementY),
    north: mazeMovementY < 0 ? null : mazeMovementY
  };
};

const getCellMovementFactor = (distance, cellWidth) => {
  const multiples = distance / cellWidth;
  const normalizedMultiples = multiples > 0.5 ? multiples - 0.5 : 0;
  return Math.ceil(normalizedMultiples);
};

const getDistanceToWall = (position, direction, cellWidth) => {
  if (direction === "east" || direction === "south") {
    return cellWidth - position * cellWidth;
  }

  return position * cellWidth;
};

export const getActiveCellData = (mazePosition, layoutWidth, mazeData) => {
  const cellWidth = layoutWidth / 3;
  const mazeMovement = getMazeMovement(mazePosition, cellWidth);

  const cellMovementFactor = {
    west: getCellMovementFactor(mazeMovement.west, cellWidth),
    east: getCellMovementFactor(mazeMovement.east, cellWidth),
    south: getCellMovementFactor(mazeMovement.south, cellWidth),
    north: getCellMovementFactor(mazeMovement.north, cellWidth)
  };

  const rowIndex = getRowIndex(
    cellMovementFactor.north,
    cellMovementFactor.south,
    initialRowIndex,
    layoutWidth
  );

  const columnIndex = getColumnIndex(
    cellMovementFactor.east,
    cellMovementFactor.west,
    initialColumnIndex,
    layoutWidth
  );

  const cell = mazeData[rowIndex][columnIndex];

  const { east, west, north, south } = mazeMovement;
  const isEast = east ? true : false;
  const isNorth = north ? true : false;
  const movementX = isEast ? east : west;
  const movementY = isNorth ? north : south;
  const movementFactorX = cellMovementFactor.east
    ? cellMovementFactor.east
    : cellMovementFactor.west;
  const movementFactorY = cellMovementFactor.north
    ? cellMovementFactor.north
    : cellMovementFactor.south;

  const playerPositionInCell = [
    getPlayerPositionInCellX(movementFactorX, isEast, movementX, cellWidth),
    getPlayerPositionInCellY(movementFactorY, isNorth, movementY, cellWidth)
  ];

  const activeCellData = {
    east: hasEastWall(cell)
      ? getDistanceToWall(playerPositionInCell[0], "east", cellWidth)
      : null,
    west: hasWestWall(cell)
      ? getDistanceToWall(playerPositionInCell[0], "west", cellWidth)
      : null,
    south: hasSouthWall(cell)
      ? getDistanceToWall(playerPositionInCell[1], "south", cellWidth)
      : null,
    north: hasNorthWall(cell)
      ? getDistanceToWall(playerPositionInCell[1], "north", cellWidth)
      : null
  };

  return activeCellData;
};

const getPlayerPositionInCellX = (
  movementFactor,
  isEast,
  distance,
  cellWidth
) => {
  const multiples = distance / cellWidth;
  if (isEast) {
    if (movementFactor === 0) {
      return multiples + 0.5;
    } else {
      return (multiples - 0.5) % 1;
    }
  }

  if (!isEast) {
    if (movementFactor === 0) {
      return 1 - (multiples + 0.5);
    } else {
      return 1 - ((multiples + 0.5) % 1);
    }
  }
};

const getPlayerPositionInCellY = (
  movementFactor,
  isNorth,
  distance,
  cellWidth
) => {
  const multiples = distance / cellWidth;
  if (isNorth) {
    if (movementFactor === 0) {
      return 1 - (multiples + 0.5);
    } else {
      return 1 - ((multiples + 0.5) % 1);
    }
  }

  if (!isNorth) {
    if (movementFactor === 0) {
      return multiples + 0.5;
    } else {
      return multiples - 0.5;
    }
  }
};
