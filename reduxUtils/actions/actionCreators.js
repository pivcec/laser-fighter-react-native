const UPDATE_ACTIVE_CELL_DATA = "UPDATE_ACTIVE_CELL_DATA";

export function updateActiveCellData(payload) {
  return { type: UPDATE_ACTIVE_CELL_DATA, payload };
}
