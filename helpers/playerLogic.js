import exactMath from "exact-math";
import {
  getMetersTraveled,
  getBearing,
  getDirectionKey
} from "./coordsCalculations";
import { playerWidthAndHeight, exactMathConfig } from "../constants/constants";

const playerPositionOffset = exactMath.div(playerWidthAndHeight, 2);

export const checkForCollisionWithPlayer = (position, widthAndHeight) => {
  const leftEdge = position[0];
  const rightEdge = exactMath.add(position[0], widthAndHeight, exactMathConfig);
  const topEdge = position[1];
  const bottomEdge = exactMath.add(
    position[1],
    widthAndHeight,
    exactMathConfig
  );
  const playerLeftEdge = exactMath.sub(
    50,
    playerPositionOffset,
    exactMathConfig
  );
  const playerRightEdge = exactMath.add(
    50,
    playerPositionOffset,
    exactMathConfig
  );
  const playerTopEdge = exactMath.sub(
    50,
    playerPositionOffset,
    exactMathConfig
  );
  const playerBottomEdge = exactMath.add(
    50,
    playerPositionOffset,
    exactMathConfig
  );

  if (
    bottomEdge > playerTopEdge &&
    topEdge < playerBottomEdge &&
    rightEdge > playerLeftEdge &&
    leftEdge < playerRightEdge
  ) {
    return true;
  }
  return false;
};

/*
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
    newPlayerPositionX = exactMath.add(
      playerPosition[0],
      playerMovement[0],
      exactMathConfig
    );
  }

  if (playerHasMovedWest) {
    newPlayerPositionX = exactMath.sub(
      playerPosition[0],
      playerMovement[0],
      exactMathConfig
    );
  }

  if (playerHasMovedSouth) {
    newPlayerPositionY = exactMath.add(
      playerPosition[1],
      playerMovement[1],
      exactMathConfig
    );
  }

  if (playerHasMovedNorth) {
    newPlayerPositionY = exactMath.sub(
      playerPosition[1],
      playerMovement[1],
      exactMathConfig
    );
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

*/
