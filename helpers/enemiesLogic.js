import { v4 as uuid } from "uuid";
import { getRandomNumberToLimit } from "./utils";

export const getNewPosition = (position, nextPosition) => {
  if (position > nextPosition) {
    return position - 1;
  }

  if (position < nextPosition) {
    return position + 1;
  }

  return position;
};

export const checkIfEnemyHasReachedHeading = (position, heading) => {
  if (
    Math.round(position[0]) === heading[0] &&
    Math.round(position[1]) === heading[1]
  ) {
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
  const playerMovementX = prevPlayerPosition[0] + -newPlayerPosition[0];
  const playerMovementY = prevPlayerPosition[1] + -newPlayerPosition[1];
  return (updatedEnemies = enemies.map(({ position, id, heading, life }) => {
    return {
      position: [position[0] + playerMovementX, position[1] + playerMovementY],
      id,
      heading,
      life
    };
  }));
};
