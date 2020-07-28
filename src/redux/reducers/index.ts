import { combineReducers } from 'redux'
import { caloriesReducer } from './calories'
import { Food } from '../actions'

export interface StoreState {
  calories: {
    test: boolean
    foods: Food[]
  }
}

export const rootReducer = combineReducers<StoreState>({
  calories: caloriesReducer
})
