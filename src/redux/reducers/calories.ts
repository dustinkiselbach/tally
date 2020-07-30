import { ActionTypes, Action, Food } from '../actions'

const initialState = {
  test: false,
  foods: [],
  error: null
}

export const caloriesReducer = (
  state: { test: boolean; foods: Food[]; error: string | null } = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.test:
      return {
        ...state,
        test: true
      }
    case ActionTypes.addFood:
      return {
        ...state,
        foods: action.payload
      }
    case ActionTypes.updateFood:
      return {
        ...state,
        foods: state.foods.map(food =>
          food.id === action.payload.id
            ? {
                ...food,
                name: action.payload.food.name,
                calories: parseInt(action.payload.food.calories)
              }
            : food
        )
      }
    case ActionTypes.deleteFood:
      return {
        ...state,
        foods: state.foods.filter(({ id }) => id !== action.payload)
      }
    case ActionTypes.foodError:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
