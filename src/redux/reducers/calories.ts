import { ActionTypes, Action, Food } from '../actions'

const initialState = {
  test: false,
  foods: []
}

export const caloriesReducer = (
  state: { test: boolean; foods: Food[] } = initialState,
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
        foods: [
          ...state.foods,
          {
            ...action.payload,
            id: Math.round(new Date().getTime() / 1000),
            date: new Date(),
            calories: parseInt(action.payload.calories)
          }
        ]
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

    default:
      return state
  }
}
