import { ActionTypes, ThunkResult } from './types'
import {
  deleteFoodFromStorage,
  updateFoodInStorage,
  addFoodToStorage
} from '../../api/asyncStorage'
import AsyncStorage from '@react-native-community/async-storage'

export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Food {
  name: string
  calories: number
  meal: Meal
  date: Date
  id: number
}

export interface Exersize {
  type: string
  caloriesBurned: number
  date: Date
  id: number
}

export interface TestAction {
  type: ActionTypes.test
}

export interface AddFoodAction {
  type: ActionTypes.addFood
  payload: Food[]
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
  payload: string | null
}

export const testFunc = () => {
  return {
    type: ActionTypes.test
  }
}

// TODO NaN is falsy so you can parse int and check
// , send an error message if it's false
// export const addFood = (
//   food: { name: string; calories: string; meal: Meal },
//   callback: () => void
// ) => {
//   if (parseInt(food.calories)) {
//     callback()
//     return {
//       type: ActionTypes.addFood,
//       payload: food
//     }
//   } else {
//     return {
//       type: ActionTypes.foodError,
//       payload: 'Please enter a number'
//     }
//   }
// }

// export const updateFood = (
//   id: number,
//   food: { name: string; calories: string },
//   callback: () => void
// ) => {
//   callback()
//   return {
//     type: ActionTypes.updateFood,
//     payload: { id, food }
//   }
// }

// export const deleteFood = (id: number) => {
//   return {
//     type: ActionTypes.deleteFood,
//     payload: id
//   }
// }

// TODO Need error handling
export const addFood = (
  food: { name: string; calories: string; meal: Meal },
  callback: () => void
): ThunkResult<void> => async dispatch => {
  try {
    const foodToAdd = {
      ...food,
      date: new Date(),
      id: Math.round(new Date().getTime() / 1000)
    }
    const foodsArr = await addFoodToStorage(foodToAdd)
    dispatch({
      type: ActionTypes.addFood,
      payload: foodsArr
    })
    callback()
  } catch (err) {
    dispatch({
      type: ActionTypes.foodError,
      payload: err.message
    })
    setTimeout(() => {
      dispatch({
        type: ActionTypes.foodError,
        payload: null
      })
    }, 2000)
    throw err
  }
}

// TODO need error handling
export const updateFood = (
  id: number,
  food: { name: string; calories: string },
  callback: () => void
): ThunkResult<void> => async dispatch => {
  try {
    await updateFoodInStorage(id, food)
    dispatch({
      type: ActionTypes.updateFood,
      payload: { id, food }
    })
    callback()
  } catch (err) {
    throw err
  }
}

export const deleteFood = (id: number): ThunkResult<void> => async dispatch => {
  try {
    await deleteFoodFromStorage(id)
    dispatch({
      type: ActionTypes.deleteFood,
      payload: id
    })
  } catch (err) {
    throw err
  }
}

export const getFoods = (): ThunkResult<void> => async dispatch => {
  try {
    const res = await AsyncStorage.getItem('foods')
    if (res) {
      const foodsArr: Food[] = JSON.parse(res)
      dispatch({
        type: ActionTypes.addFood,
        payload: foodsArr
      })
    }
  } catch (err) {
    throw err
  }
}

// export const addExcersize = (excersize: {
//   type: string
//   caloriesBurned: string
// }): ThunkResult<void> => async dispatch => {
//   try {
//     const foodToAdd = {
//       ...excersize,
//       caloriesBurned: parseInt(excersize.caloriesBurned),
//       date: new Date(),
//       id: Math.round(new Date().getTime() / 1000)
//     }
//     // const foodsArr = await addFoodToStorage(foodToAdd)
//   } catch (err) {
//     throw err
//   }
// }
