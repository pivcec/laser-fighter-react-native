const initialState = {
  activeCellData: null
};

export default function players(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_ACTIVE_CELL_DATA":
      return {
        ...state,
        activeCellData: action.payload
      };
    default:
      return state;
  }
}
