import {
  TestAction,
  AddFoodAction,
  DeleteFoodAction,
  UpdateFoodAction
} from './calories'

export enum ActionTypes {
  test,
  addFood,
  updateFood,
  deleteFood,
  foodError
}

export type Action =
  | TestAction
  | AddFoodAction
  | UpdateFoodAction
  | DeleteFoodAction
