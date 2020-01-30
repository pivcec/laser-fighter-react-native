const initialState = {
  activeMazeZoneData: null
};

export default function players(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_ACTIVE_MAZE_ZONE_DATA":
      return {
        ...state,
        activeMazeZoneData: action.payload.activeMazeZoneData
      };
    default:
      return state;
  }
}
