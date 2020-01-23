import exactMath from "exact-math";
import { playerWidthAndHeight, exactMathConfig } from "../constants/constants";

const playerPositionOffset = exactMath.div(playerWidthAndHeight, 2);

export const checkForCollisionWithPlayer = (position, widthAndHeight) => {
  const enemyLeftEdge = position[0];
  const enemyRightEdge = exactMath.add(
    enemyLeftEdge,
    widthAndHeight,
    exactMathConfig
  );
  const enemyBottomEdge = position[1];
  const enemyTopEdge = exactMath.add(
    enemyBottomEdge,
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
    enemyBottomEdge < playerTopEdge &&
    enemyTopEdge < playerBottomEdge &&
    enemyRightEdge > playerLeftEdge &&
    enemyLeftEdge < playerRightEdge
  ) {
    return true;
  }
  return false;
};
