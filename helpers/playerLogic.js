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
