import exactMath from "exact-math";
import { exactMathConfig } from "../constants/constants";

export const getInitialVortexPosition = () => {
  return [1, 1];
};

export const getUpdatedVortexPosition = (
  vortexPosition,
  prevPlayerPosition,
  newPlayerPosition
) => {
  const playerMovementX = exactMath.add(
    prevPlayerPosition[0],
    -newPlayerPosition[0],
    exactMathConfig
  );
  const playerMovementY = exactMath.add(
    prevPlayerPosition[1],
    -newPlayerPosition[1],
    exactMathConfig
  );

  return [
    exactMath.sub(
      vortexPosition[0],
      Math.round(playerMovementX).toFixed(2),
      exactMathConfig
    ),
    exactMath.sub(
      vortexPosition[1],
      Math.round(playerMovementY).toFixed(2),
      exactMathConfig
    )
  ];
};
