import exactMath from "exact-math";
import {
  playerWidthAndHeight,
  enemyWidthAndHeight,
  exactMathConfig
} from "../constants/constants";

const playerPositionOffset = exactMath.div(playerWidthAndHeight, 2);

export const checkForCollisionWithPlayer = (fieldMovement, enemyPosition) => {
  const enemyPositionX = enemyPosition[0] + fieldMovement[0];
  const enemyPositionY = enemyPosition[1] + fieldMovement[1];
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

  const enemyLeftEdge = enemyPositionX;
  const enemyRightEdge = exactMath.add(
    enemyLeftEdge,
    enemyWidthAndHeight,
    exactMathConfig
  );
  const enemyTopEdge = enemyPositionY;
  const enemyBottomEdge = exactMath.add(
    enemyTopEdge,
    enemyWidthAndHeight,
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
      return Math.abs(distance) > west ? -west + 10 : distance;
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
      return Math.abs(distance) > south ? -south + 10 : distance;
    }
    return distance;
  }

  return distance;
};
