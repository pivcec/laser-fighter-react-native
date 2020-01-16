import {
  getMetersTraveled,
  getBearing,
  getDirectionKey
} from "./coordsCalculations";

const getUpdatedPlayerPosition = (
  playerPosition,
  playerMovement,
  directionKey
) => {
  playerHasMovedSouth = [3, 4, 5].includes(directionKey);
  playerHasMovedNorth = [0, 1, 7].includes(directionKey);
  playerHasMovedEast = [5, 6, 7].includes(directionKey);
  playerHasMovedWest = [1, 2, 3].includes(directionKey);

  let newPlayerPositionX = playerPosition[0];
  let newPlayerPositionY = playerPosition[1];

  if (playerHasMovedEast) {
    newPlayerPositionX = playerPosition[0] + playerMovement[0];
  }

  if (playerHasMovedWest) {
    newPlayerPositionX = playerPosition[0] - playerMovement[0];
  }

  if (playerHasMovedSouth) {
    newPlayerPositionY = playerPosition[1] + playerMovement[1];
  }

  if (playerHasMovedNorth) {
    newPlayerPositionY = playerPosition[1] - playerMovement[1];
  }

  return [newPlayerPositionX, newPlayerPositionY];
};

export const handleGetUpdatedPlayerPosition = (start, end, playerPosition) => {
  const playerMovementDistanceX = getMetersTraveled(
    [start.longitude, start.latitude],
    [end.longitude, start.latitude]
  );

  const playerMovementDistanceY = getMetersTraveled(
    [start.longitude, start.latitude],
    [start.longitude, end.latitude]
  );

  const bearing = getBearing(
    [start.longitude, start.latitude],
    [end.longitude, end.latitude]
  );

  const directionKey = getDirectionKey(bearing);

  const updatedPlayerPosition = getUpdatedPlayerPosition(
    playerPosition,
    [playerMovementDistanceX, playerMovementDistanceY],
    directionKey
  );

  return updatedPlayerPosition;
};
