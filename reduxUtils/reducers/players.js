const initialState = {
  refsToPlayers: []
};

export default function players(state = initialState, action) {
  switch (action.type) {
    case "CREATE_REF_TO_PLAYER":
      return {
        ...state
      };
    default:
      return state;
  }
}
