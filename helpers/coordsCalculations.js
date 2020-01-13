export const getMetersTraveled = (start, end) => {
  const R = 6371.071; // Radius of the Earth in km
  const rlat1 = start[0] * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = end[0] * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (start[1] - end[1]) * (Math.PI / 180); // Radian difference (longitudes)

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d * 1000;
};

const toRadians = degrees => {
  return (degrees * Math.PI) / 180;
};

const toDegrees = radians => {
  return (radians * 180) / Math.PI;
};

export const getBearing = (start, end) => {
  const startLat = toRadians(start[0]);
  const startLng = toRadians(start[1]);
  const endLat = toRadians(end[0]);
  const endLng = toRadians(end[1]);

  const y = Math.sin(endLng - startLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
  const brng = toDegrees(Math.atan2(y, x));
  return (brng + 360) % 360;
};

export const getDirectionKey = bearing => {
  return Math.round(((bearing %= 360) < 0 ? bearing + 360 : bearing) / 45) % 8;
};

const getNewPosition = (negative, positive, position, distance) => {
  let newPosition;

  if (negative) {
    newPosition = position - distance;
  } else if (positive) {
    newPosition = position + distance;
  } else {
    newPosition = position;
  }

  return Math.round(newPosition);
};

export const getNewPlayerPosition = (
  playerPosition,
  playerMovement,
  directionKey
) => {
  playerHasMovedSouth = [3, 4, 5].includes(directionKey);
  playerHasMovedNorth = [0, 1, 7].includes(directionKey);
  playerHasMovedEast = [5, 6, 7].includes(directionKey);
  playerHasMovedWest = [1, 2, 3].includes(directionKey);

  const newPlayerPositionX = getNewPosition(
    playerHasMovedEast,
    playerHasMovedWest,
    playerPosition[0],
    playerMovement[0]
  );
  const newPlayerPositionY = getNewPosition(
    playerHasMovedNorth,
    playerHasMovedSouth,
    playerPosition[1],
    playerMovement[1]
  );

  return [newPlayerPositionX, newPlayerPositionY];
};

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
