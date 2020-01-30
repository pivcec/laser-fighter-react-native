const UPDATE_ACTIVE_MAZE_ZONE_DATA = "UPDATE_ACTIVE_MAZE_ZONE_DATA";

export function updateActiveMazeZoneData(payload) {
  return { type: UPDATE_ACTIVE_MAZE_ZONE_DATA, payload };
}
