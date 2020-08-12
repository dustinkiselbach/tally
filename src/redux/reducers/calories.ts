import { ActionTypes, Action, Food, Excersize } from '../actions'

const initialState = {
  test: false,
  foods: [],
  excersizes: [],
  error: null
}

export const caloriesReducer = (
  state: {
    test: boolean
    foods: Food[]
    excersizes: Excersize[]
    error: string | null
  } = initialState,
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
    case ActionTypes.addExcersize:
      return {
        ...state,
        excersizes: action.payload
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
    case ActionTypes.updateExcersize:
      console.log(action.payload)
      return {
        ...state,
        excersizes: state.excersizes.map(excersize =>
          excersize.id === action.payload.id
            ? {
                ...excersize,
                type: action.payload.excersize.type,
                caloriesBurned: parseInt(
                  action.payload.excersize.caloriesBurned
                )
              }
            : excersize
        )
      }
    case ActionTypes.deleteFood:
      return {
        ...state,
        foods: state.foods.filter(({ id }) => id !== action.payload)
      }
    case ActionTypes.deleteExcersize:
      return {
        ...state,
        excersizes: state.excersizes.filter(({ id }) => id !== action.payload)
      }
    case ActionTypes.entryError:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
