import {
  TestAction,
  AddFoodAction,
  DeleteFoodAction,
  UpdateFoodAction,
  AddExcersizeAction,
  DeleteExcersizeAction,
  UpdateExcersizeAction,
  EntryErrorAction
} from './calories'
import { ThunkAction } from 'redux-thunk'
import { StoreState } from '../reducers'
import { UpdateGoalAction } from './goals'

export type ThunkResult<R> = ThunkAction<R, StoreState, never, Action>

export enum ActionTypes {
  test,
  addFood,
  addExcersize,
  updateFood,
  updateExcersize,
  deleteFood,
  deleteExcersize,
  updateGoal,
  entryError
}

export type Action =
  | TestAction
  | AddFoodAction
  | AddExcersizeAction
  | UpdateFoodAction
  | UpdateExcersizeAction
  | DeleteFoodAction
  | DeleteExcersizeAction
  | UpdateGoalAction
  | EntryErrorAction
