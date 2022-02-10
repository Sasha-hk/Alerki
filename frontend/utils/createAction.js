export const makeAction = (action) => {
  return {
    type: action,
  }
}

export const makeActionWithPayload = (action, payload) => {
  return {
    type: action,
    payload,
  }
}
