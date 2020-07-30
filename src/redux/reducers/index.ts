import { combineReducers } from 'redux'
import { caloriesReducer } from './calories'
import { goalsReducer } from './goals'
import { Food } from '../actions'

export interface StoreState {
  calories: {
    test: boolean
    foods: Food[]
    error: string | null
  }
  goals: {
    goal: number | null
  }
}

export const rootReducer = combineReducers<StoreState>({
  calories: caloriesReducer,
  goals: goalsReducer
})
