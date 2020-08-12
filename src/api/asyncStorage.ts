import AsyncStorage from '@react-native-community/async-storage'
import { Food, Meal, Excersize } from '../redux/actions'
import { isInteger } from '../utils'

export const deleteFoodFromStorage = async (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const Foods = await AsyncStorage.getItem('foods')
    if (Foods) {
      let foodsArr: Food[] = JSON.parse(Foods)
      await AsyncStorage.setItem(
        'foods',
        JSON.stringify(foodsArr.filter(foodItem => foodItem.id !== id))
      )
      resolve()
    } else {
      return reject(new Error('You have no foods stored'))
    }
  })
}

export const updateFoodInStorage = async (
  id: number,
  food: { name: string; calories: string }
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const Foods = await AsyncStorage.getItem('foods')
    if (Foods) {
      if (isInteger(food.calories)) {
        let foodsArr: Food[] = JSON.parse(Foods)
        await AsyncStorage.setItem(
          'foods',
          JSON.stringify(
            foodsArr.map(foodItem =>
              foodItem.id === id
                ? {
                    ...foodItem,
                    name: food.name,
                    calories: parseInt(food.calories)
                  }
                : foodItem
            )
          )
        )
        resolve()
      } else {
        return reject(new Error('Please enter a number'))
      }
    } else {
      return reject(new Error('You have no foods stored'))
    }
  })
}

export const addFoodToStorage = async (foodToAdd: {
  name: string
  calories: string
  meal: Meal
  date: Date
  id: number
}): Promise<Food[]> => {
  return new Promise(async (resolve, reject) => {
    if (isInteger(foodToAdd.calories)) {
      const Foods = await AsyncStorage.getItem('foods')
      const _foodToAdd: Food = {
        ...foodToAdd,
        calories: parseInt(foodToAdd.calories)
      }
      if (Foods) {
        let foodsArr: Food[] = JSON.parse(Foods)
        foodsArr.push(_foodToAdd)
        await AsyncStorage.setItem('foods', JSON.stringify(foodsArr))
        return resolve(foodsArr)
      } else {
        let newFoodsArr: Food[] = [_foodToAdd]
        await AsyncStorage.setItem('foods', JSON.stringify(newFoodsArr))
        return resolve(newFoodsArr)
      }
    } else {
      return reject(new Error('Please enter a number'))
    }
  })
}

export const addExcersizeToStorage = async (excersizeToAdd: {
  type: string
  caloriesBurned: string
  date: Date
  id: number
}) => {
  if (isInteger(excersizeToAdd.caloriesBurned)) {
    const Excersizes = await AsyncStorage.getItem('excersizes')
    const _excersizeToAdd: Excersize = {
      ...excersizeToAdd,
      caloriesBurned: parseInt(excersizeToAdd.caloriesBurned)
    }
    if (Excersizes) {
      let excersizesArr: Excersize[] = JSON.parse(Excersizes)
      excersizesArr.push(_excersizeToAdd)
      await AsyncStorage.setItem('excersizes', JSON.stringify(excersizesArr))
      return excersizesArr
    } else {
      let newExcersizesArr: Excersize[] = [_excersizeToAdd]
      await AsyncStorage.setItem('excersizes', JSON.stringify(newExcersizesArr))
      return newExcersizesArr
    }
  } else {
    throw new Error('Please enter a number')
  }
}

export const deleteExcersizeFromStorage = async (id: number) => {
  const Excersizes = await AsyncStorage.getItem('excersizes')
  if (Excersizes) {
    let excersizesArr: Excersize[] = JSON.parse(Excersizes)
    await AsyncStorage.setItem(
      'excersizes',
      JSON.stringify(
        excersizesArr.filter(excersizeItem => excersizeItem.id !== id)
      )
    )
  } else {
    throw new Error('You have no excersizes stored')
  }
}

export const updateExcersizeInStorage = async (
  id: number,
  excersize: { type: string; caloriesBurned: string }
) => {
  const Excersizes = await AsyncStorage.getItem('excersizes')
  if (Excersizes) {
    if (isInteger(excersize.caloriesBurned)) {
      let excersizesArr: Excersize[] = JSON.parse(Excersizes)
      await AsyncStorage.setItem(
        'excersizes',
        JSON.stringify(
          excersizesArr.map(excersizeItem =>
            excersizeItem.id === id
              ? {
                  ...excersizeItem,
                  type: excersize.type,
                  caloriesBurned: parseInt(excersize.caloriesBurned)
                }
              : excersizeItem
          )
        )
      )
    } else {
      throw new Error('Please enter a number')
    }
  } else {
    throw new Error('You have no excersizes')
  }
}
