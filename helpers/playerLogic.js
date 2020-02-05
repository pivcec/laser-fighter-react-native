import exactMath from "exact-math";
import {
  playerWidthAndHeight,
  enemyWidthAndHeight,
  exactMathConfig
} from "../constants/constants";

const playerPositionOffset = exactMath.div(playerWidthAndHeight, 2);

export const checkForCollisionWithPlayer = position => {
  const enemyLeftEdge = position[0];
  const enemyRightEdge = exactMath.add(
    enemyLeftEdge,
    enemyWidthAndHeight,
    exactMathConfig
  );
  const enemyTopEdge = position[1];
  const enemyBottomEdge = exactMath.add(
    enemyTopEdge,
    enemyWidthAndHeight,
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
    enemyBottomEdge > playerTopEdge &&
    enemyTopEdge < playerBottomEdge &&
    enemyRightEdge > playerLeftEdge &&
    enemyLeftEdge < playerRightEdge
  ) {
    return true;
  }
  return false;
};

export const checkWallDistanceX = (distance, activeCellData) => {
  const { west, east } = activeCellData;
  if (distance > 0) {
    if (east) {
      return distance > east ? east - 10 : distance;
    }
    return distance;
  }

  if (distance < 0) {
    if (west) {
      return Math.abs(distance) > west ? west : distance;
    }
    return distance;
  }

  return distance;
};

export const checkWallDistanceY = (distance, activeCellData) => {
  const { north, south } = activeCellData;
  if (distance > 0) {
    if (north) {
      return distance > north ? north - 10 : distance;
    }
    return distance;
  }

  if (distance < 0) {
    if (south) {
      return Math.abs(distance) > south ? south : distance;
    }
    return distance;
  }

  return distance;
};
