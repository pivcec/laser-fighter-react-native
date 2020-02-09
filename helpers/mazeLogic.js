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
  [9, 6, 9, 1, 5, 6, 10, 10, 10, 10],
  [12, 5, 6, 12, 5, 5, 6, 12, 6, 14]
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
  if (north < 0.5 && south < 0.5) {
    return initialRowIndex;
  } else {
    const normalized = north ? Math.ceil(north - 0.5) : Math.ceil(south - 0.5);
    return north ? initialRowIndex - normalized : initialRowIndex + normalized;
  }
};

const getColumnIndex = (east, west, initialColumnIndex) => {
  if (east < 0.5 && west < 0.5) {
    return initialColumnIndex;
  } else {
    const normalized = east ? Math.ceil(east - 0.5) : Math.ceil(west - 0.5);
    return east
      ? initialColumnIndex + normalized
      : initialColumnIndex - normalized;
  }
};

const getCellMovementFactor = (distance, cellWidth) => {
  const multiples = distance / cellWidth;
  return multiples;
};

const getDistanceToWall = (position, direction, cellWidth) => {
  if (direction === "east" || direction === "south") {
    return cellWidth - position * cellWidth;
  }

  return position * cellWidth;
};

const getPlayerCellMovement = (playerPosition, layoutWidth) => {
  const originalPosition = layoutWidth / 2;
  const movementX = originalPosition - playerPosition[0];
  const movementY = originalPosition - playerPosition[1];

  return {
    east: movementX > 0 ? null : Math.abs(movementX),
    west: movementX < 0 ? null : movementX,
    north: movementY > 0 ? null : Math.abs(movementY),
    south: movementY < 0 ? null : movementY
  };
};

export const getActiveCellData = (playerPosition, layoutWidth, mazeData) => {
  const cellWidth = layoutWidth / 3;

  const playerCellMovement = getPlayerCellMovement(playerPosition, layoutWidth);

  const cellMovementFactor = {
    west: getCellMovementFactor(playerCellMovement.west, cellWidth),
    east: getCellMovementFactor(playerCellMovement.east, cellWidth),
    south: getCellMovementFactor(playerCellMovement.south, cellWidth),
    north: getCellMovementFactor(playerCellMovement.north, cellWidth)
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
  const { north, south, east, west } = cellMovementFactor;
  const playerPositionInCell = [
    getPlayerPositionInCellX(east, west),
    getPlayerPositionInCellY(north, south)
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

const getPlayerPositionInCellX = (east, west) => {
  if (east < 0.5 && west < 0.5) {
    return east ? east + 0.5 : 1 - (west + 0.5);
  } else {
    return east ? (east - 0.5) % 1 : 1 - ((west - 0.5) % 1);
  }
};

const getPlayerPositionInCellY = (north, south) => {
  if (north < 0.5 && south < 0.5) {
    return north ? 1 - (north + 0.5) : south + 0.5;
  } else {
    return north ? 1 - ((north - 0.5) % 1) : south - 0.5;
  }
};
