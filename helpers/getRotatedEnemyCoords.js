export const getRotatedEnemyCoords = (heading, enemies) => {
  return (rotatedEnemyCoords = enemies.map(enemy => {
    const { coords } = enemy;
    return {
      ...enemy,
      coords: getRotatedCoords(coords[0], coords[1], heading)
    };
  }));
};

const getRotatedCoords = (x, y, angle) => {
  const radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - 50) + sin * (y - 50) + 50,
    ny = cos * (y - 50) - sin * (x - 50) + 50;
  return [nx, ny];
};
