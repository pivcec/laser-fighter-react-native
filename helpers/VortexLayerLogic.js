const vortexData = [
  { position: [0, 0], text: "one" },
  { position: [0, 1], text: "two" },
  { position: [0, 2], text: "three" },
  { position: [1, 0], text: "four" },
  { position: [1, 1], text: "five" },
  { position: [1, 2], text: "six" },
  { position: [2, 0], text: "seven" },
  { position: [2, 1], text: "eight" },
  { position: [2, 2], text: "nine" }
];

export const generateVortexData = () => {
  return vortexData;
};

export const getNewCellData = position => {
  return { position, text: "new" };
};

/*
<?xml version="1.0" standalone="no"?>
<svg
  width="600"
  height="600"
  viewBox="0 0 600 600"
  xmlns="http://www.w3.org/2000/svg"
>
  <g transform="translate(300,300)">
    <path d="M144.3,-134.2C165.6,-88.4,146.6,-29.6,134.6,33.7C122.5,96.9,117.2,164.7,78.5,196C39.8,227.3,-32.4,222.2,-86.8,191.7C-141.2,161.1,-177.8,105,-194.2,41.9C-210.5,-21.2,-206.5,-91.3,-170.7,-140.5C-135,-189.7,-67.5,-217.8,-3,-215.4C61.5,-213,123,-180.1,144.3,-134.2Z" fill="#FFB4BC" />
  </g>
</svg>
  */
