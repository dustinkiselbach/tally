import { ThunkResult, ActionTypes } from './types'
import AsyncStorage from '@react-native-community/async-storage'

// export const updateGoal = (goal: number, callback: () => void) => {
//   return async (dispatch: Dispatch<UpdateGoalAction>) => {
//     try {
//       await AsyncStorage.setItem('goal', goal.toString())
//       callback()
//       dispatch({
//         type: ActionTypes.updateGoal,
//         payload: goal
//       })
//     } catch (err) {
//       throw err
//     }
//   }
// }

export interface UpdateGoalAction {
  type: ActionTypes.updateGoal
  payload: number
}

export const updateGoal = (
  goal: number,
  callback: () => void
): ThunkResult<void> => async dispatch => {
  try {
    await AsyncStorage.setItem('goal', goal.toString())
    callback()
    dispatch({
      type: ActionTypes.updateGoal,
      payload: goal
    })
  } catch (err) {
    throw err
  }
}

export const getGoal = (): ThunkResult<void> => async dispatch => {
  try {
    const res = await AsyncStorage.getItem('goal')
    if (res) {
      dispatch({
        type: ActionTypes.updateGoal,
        payload: parseInt(res)
      })
    }
  } catch (err) {
    throw err
  }
}
