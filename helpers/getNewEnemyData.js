import { v4 as uuid } from "uuid";

export const getNewEnemyData = () => {
  const entryAxis = Math.round(Math.random());
  const entryPoint = Math.round(Math.random()) === 0 ? -5 : 105;
  const movementPath = generateMovementPath();

  const newEnemyData = {
    coords: [
      // entryAxis === 0 ? entryPoint : getRandomNumberToLimit(100.0),
      // entryAxis === 1 ? entryPoint : getRandomNumberToLimit(100.0)
      70,
      90
    ],
    id: uuid()
    // movementPath
  };

  return newEnemyData;
};

const getRandomNumberToLimit = limit => {
  return (Math.random() * (limit - 1.0 + 1.0) + 1.0).toFixed(2);
};

const generateMovementPath = () => {
  const movementPath = [];

  let i;
  for (i = 0; i < 100; i++) {
    const movement = [
      getRandomNumberToLimit(100.0),
      getRandomNumberToLimit(100.0)
    ];

    movementPath.push(movement);
  }

  return movementPath;
};
