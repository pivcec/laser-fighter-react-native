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

export const getPositionRotatedAroundPrevious = (prevX, prevY, x, y, angle) => {
  const radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = cos * (x - prevX) + sin * (y - prevY) + prevX;
  const ny = cos * (y - prevY) - sin * (x - prevX) + prevY;
  return [nx, ny];
};
