import { RouteProp, NavigationProp } from '@react-navigation/native'
import { Meal } from '../redux/actions'

export type CaloriesStackParamList = {
  Log: undefined
  Add: { entryCategory: Meal | 'excersizes' }
  Update: { id: number; excersize?: boolean }
}

type AddScreenRouteProp = RouteProp<CaloriesStackParamList, 'Add'>
export type AddScreenNavigationProp = NavigationProp<
  CaloriesStackParamList,
  'Add'
>
type UpdateScreenRouteProp = RouteProp<CaloriesStackParamList, 'Update'>
export type UpdateScreenNavigationProp = NavigationProp<
  CaloriesStackParamList,
  'Update'
>

export type AddProps = {
  route: AddScreenRouteProp
  navigation: AddScreenNavigationProp
}

export type UpdateProps = {
  route: UpdateScreenRouteProp
  navigation: UpdateScreenNavigationProp
}
