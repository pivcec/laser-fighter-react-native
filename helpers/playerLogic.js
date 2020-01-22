import exactMath from "exact-math";
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
