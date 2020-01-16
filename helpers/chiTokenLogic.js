import { v4 as uuid } from "uuid";

export const getNewChiToken = position => {
  return {
    position,
    id: uuid()
  };
};
