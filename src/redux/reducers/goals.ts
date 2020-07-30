import { ActionTypes, Action } from '../actions'

const initialState = {
  goal: null
}

export const goalsReducer = (
  state: { goal: number | null } = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.updateGoal:
      return {
        ...state,
        goal: action.payload
      }

    default:
      return state
  }
}
