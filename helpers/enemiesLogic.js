import { v4 as uuid } from "uuid";
import { getRandomNumberToLimit } from "./utils";
import exactMath from "exact-math";
import { exactMathConfig } from "../constants/constants";

export const getNewPosition = (position, nextPosition) => {
  if (position > nextPosition) {
    return exactMath.sub(position, 1, exactMathConfig);
  }

  if (position < nextPosition) {
    return exactMath.add(position, 1, exactMathConfig);
  }

  return position;
};

export const checkIfEnemyHasReachedHeading = (position, heading) => {
  if (position[0] === heading[0] && position[1] === heading[1]) {
    return [getRandomNumberToLimit(100), getRandomNumberToLimit(100)];
  }
  return heading;
};

export const getNewEnemyData = () => {
  const entryAxis = Math.round(Math.random());
  const entryPoint = Math.round(Math.random()) === 0 ? -5 : 105;
  const newEnemyData = {
    position: [
      entryAxis === 0 ? entryPoint : getRandomNumberToLimit(100),
      entryAxis === 1 ? entryPoint : getRandomNumberToLimit(100)
    ],
    id: uuid(),
    heading: [getRandomNumberToLimit(100), getRandomNumberToLimit(100)],
    life: 100
  };

  return newEnemyData;
};

export const getUpdatedEnemyPositions = (
  enemies,
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

  return (updatedEnemies = enemies.map(({ position, id, heading, life }) => {
    return {
      position: [
        exactMath.sub(
          position[0],
          Math.round(playerMovementX).toFixed(2),
          exactMathConfig
        ),
        exactMath.sub(
          position[1],
          Math.round(playerMovementY).toFixed(2),
          exactMathConfig
        )
      ],
      id,
      heading,
      life
    };
  }));
};
