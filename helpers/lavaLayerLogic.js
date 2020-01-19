const lavaData = [
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

export const generateLavaData = () => {
  return lavaData;
};

export const getNewCellData = position => {
  return { position, text: "new" };
};
