const initialState = {
  offsetHeading: null
};

export default function players(state = initialState, action) {
  switch (action.type) {
    case "CREATE_OFFSET_HEADING":
      return {
        ...state,
        offsetHeading: action.payload.offsetHeading
      };
    default:
      return state;
  }
}
