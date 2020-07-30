import {
  TestAction,
  AddFoodAction,
  DeleteFoodAction,
  UpdateFoodAction,
  FoodErrorAction
} from './calories'
import { ThunkAction } from 'redux-thunk'
import { StoreState } from '../reducers'
import { UpdateGoalAction } from './goals'

export type ThunkResult<R> = ThunkAction<R, StoreState, never, Action>

export enum ActionTypes {
  test,
  addFood,
  updateFood,
  deleteFood,
  updateGoal,
  foodError
}

export type Action =
  | TestAction
  | AddFoodAction
  | UpdateFoodAction
  | DeleteFoodAction
  | UpdateGoalAction
  | FoodErrorAction
