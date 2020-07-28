// import { Dispatch } from 'redux'
import { ActionTypes } from './types'

export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Food {
  name: string
  calories: number
  meal: Meal
  date: Date
  id: number
}

export interface TestAction {
  type: ActionTypes.test
}

export interface AddFoodAction {
  type: ActionTypes.addFood
  payload: { name: string; calories: string; meal: Meal }
}

export interface UpdateFoodAction {
  type: ActionTypes.updateFood
  payload: { id: number; food: { name: string; calories: string } }
}

export interface DeleteFoodAction {
  type: ActionTypes.deleteFood
  payload: number
}

export interface FoodErrorAction {
  type: ActionTypes.foodError
  payload: string
}

export const testFunc = () => {
  return {
    type: ActionTypes.test
  }
}

// NaN is falsy so you can parse int and check
// , send an error message if it's false
export const addFood = (
  food: { name: string; calories: string; meal: Meal },
  callback: () => void
) => {
  if (parseInt(food.calories)) {
    callback()
    return {
      type: ActionTypes.addFood,
      payload: food
    }
  } else {
    return {
      type: ActionTypes.foodError,
      payload: 'Please enter a number'
    }
  }
}

export const updateFood = (
  id: number,
  food: { name: string; calories: string },
  callback: () => void
) => {
  callback()
  return {
    type: ActionTypes.updateFood,
    payload: { id, food }
  }
}

export const deleteFood = (id: number) => {
  return {
    type: ActionTypes.deleteFood,
    payload: id
  }
}
