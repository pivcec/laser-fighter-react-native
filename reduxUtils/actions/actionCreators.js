const CREATE_REF_TO_PLAYER = "CREATE_REF_TO_PLAYER";

export function createRefToPlayer(payload) {
  return { type: CREATE_REF_TO_PLAYER, payload };
}
