const toRadians = degrees => {
  return (degrees * Math.PI) / 180;
};

const toDegrees = radians => {
  return (radians * 180) / Math.PI;
};

export const getMetersTraveled = (start, end) => {
  const R = 6371.071;
  const rlat1 = toRadians(start[1]);
  const rlat2 = toRadians(end[1]);
  const difflat = rlat2 - rlat1;
  const difflon = toRadians(start[0] - end[0]);

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

export const getBearing = (start, end) => {
  const startLat = toRadians(start[1]);
  const startLng = toRadians(start[0]);
  const endLat = toRadians(end[1]);
  const endLng = toRadians(end[0]);

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

export const getNewPlayerPosition = (
  playerPosition,
  playerMovement,
  directionKey
) => {
  playerHasMovedSouth = [3, 4, 5].includes(directionKey);
  playerHasMovedNorth = [0, 1, 7].includes(directionKey);
  playerHasMovedEast = [5, 6, 7].includes(directionKey);
  playerHasMovedWest = [1, 2, 3].includes(directionKey);

  let newPlayerPositionX = playerPosition[0];
  let newPlayerPositionY = playerPosition[1];

  if (playerHasMovedEast) {
    newPlayerPositionX = playerPosition[0] + playerMovement[0];
  }

  if (playerHasMovedWest) {
    newPlayerPositionX = playerPosition[0] - playerMovement[0];
  }

  if (playerHasMovedSouth) {
    newPlayerPositionY = playerPosition[1] + playerMovement[1];
  }

  if (playerHasMovedNorth) {
    newPlayerPositionY = playerPosition[1] - playerMovement[1];
  }

  return [newPlayerPositionX, newPlayerPositionY];
};

export const getRotatedEnemyPosition = (heading, enemies) => {
  return enemies.map(enemy => {
    const { position } = enemy;
    return {
      ...enemy,
      position: getRotatedPosition(position[0], position[1], heading)
    };
  });
};

const getRotatedPosition = (x, y, angle) => {
  const radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - 50) + sin * (y - 50) + 50,
    ny = cos * (y - 50) - sin * (x - 50) + 50;
  return [nx, ny];
};
