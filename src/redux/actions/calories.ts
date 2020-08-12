import { ActionTypes, ThunkResult } from './types'
import {
  deleteFoodFromStorage,
  updateFoodInStorage,
  addFoodToStorage,
  addExcersizeToStorage,
  deleteExcersizeFromStorage,
  updateExcersizeInStorage
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

export interface Excersize {
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

export interface AddExcersizeAction {
  type: ActionTypes.addExcersize
  payload: Excersize[]
}

export interface UpdateFoodAction {
  type: ActionTypes.updateFood
  payload: { id: number; food: { name: string; calories: string } }
}
export interface UpdateExcersizeAction {
  type: ActionTypes.updateExcersize
  payload: { id: number; excersize: { type: string; caloriesBurned: string } }
}

export interface DeleteFoodAction {
  type: ActionTypes.deleteFood
  payload: number
}

export interface DeleteExcersizeAction {
  type: ActionTypes.deleteExcersize
  payload: number
}

export interface EntryErrorAction {
  type: ActionTypes.entryError
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
      type: ActionTypes.entryError,
      payload: err.message
    })
    setTimeout(() => {
      dispatch({
        type: ActionTypes.entryError,
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

export const addExcersize = (
  excersize: {
    type: string
    caloriesBurned: string
  },
  callback: () => void
): ThunkResult<void> => async dispatch => {
  try {
    const excersizeToAdd = {
      ...excersize,
      date: new Date(),
      id: Math.round(new Date().getTime() / 1000)
    }

    const excersizesArr = await addExcersizeToStorage(excersizeToAdd)
    console.log(excersizesArr)
    dispatch({
      type: ActionTypes.addExcersize,
      payload: excersizesArr
    })
    callback()
  } catch (err) {
    dispatch({
      type: ActionTypes.entryError,
      payload: err.message
    })
    setTimeout(() => {
      dispatch({
        type: ActionTypes.entryError,
        payload: null
      })
    }, 2000)
    throw err
  }
}

export const getExcersizes = (): ThunkResult<void> => async dispatch => {
  try {
    const res = await AsyncStorage.getItem('excersizes')
    if (res) {
      const excersizesArr: Excersize[] = JSON.parse(res)
      dispatch({
        type: ActionTypes.addExcersize,
        payload: excersizesArr
      })
    }
  } catch (err) {
    throw err
  }
}

export const deleteExcersize = (
  id: number
): ThunkResult<void> => async dispatch => {
  try {
    await deleteExcersizeFromStorage(id)
    dispatch({
      type: ActionTypes.deleteExcersize,
      payload: id
    })
  } catch (err) {
    throw err
  }
}

// TODO need error handling
export const updateExcersize = (
  id: number,
  excersize: { type: string; caloriesBurned: string },
  callback: () => void
): ThunkResult<void> => async dispatch => {
  try {
    await updateExcersizeInStorage(id, excersize)

    dispatch({
      type: ActionTypes.updateExcersize,
      payload: { id, excersize }
    })
    callback()
  } catch (err) {
    throw err
  }
}
