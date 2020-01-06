import { v4 as uuid } from "uuid";

export const getNewEnemyData = () => {
  const entryAxis = Math.round(Math.random());
  const entryPoint = Math.round(Math.random()) === 0 ? -5 : 105;
  const movementPath = generateMovementPath();

  const newEnemyData = {
    coords: [
      entryAxis === 0 ? entryPoint : getRandomNumberToLimit(100),
      entryAxis === 1 ? entryPoint : getRandomNumberToLimit(100)
    ],
    id: uuid(),
    movementPath,
    nextCoordsKey: 0
  };

  return newEnemyData;
};

const getRandomNumberToLimit = limit => {
  return Math.floor(Math.random() * (limit - 0 + 1)) + 0;
};

const generateMovementPath = () => {
  const movementPath = [];

  let i;
  for (i = 0; i < 100; i++) {
    const movement = [getRandomNumberToLimit(100), getRandomNumberToLimit(100)];

    movementPath.push(movement);
  }

  return movementPath;
};
