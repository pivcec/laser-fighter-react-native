import { v4 as uuid } from "uuid";

export const getRandomNumberToLimit = limit => {
  return Math.floor(Math.random() * (limit - 0 + 1)) + 0;
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
