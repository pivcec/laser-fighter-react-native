export const getRotatedPlayerCoords = (heading, playerData) => {
  return (rotatedPlayerCoords = playerData.map(player => {
    const { coords, id } = player;
    return {
      coords: getRotatedCoords(coords[0], coords[1], heading),
      id
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
