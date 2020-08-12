import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { EntryForm } from '../..'
import { UpdateProps } from '../../../types/caloriesTypes'
import { connect } from 'react-redux'
import {
  updateFood,
  Food,
  updateExcersize,
  Excersize
} from '../../../redux/actions'
import { StoreState } from '../../../redux/reducers'

interface _UpdateProps extends UpdateProps {
  updateFood: typeof updateFood
  updateExcersize: typeof updateExcersize
  foods: Food[]
  excersizes: Excersize[]
}

const Update: React.FC<_UpdateProps> = ({
  route,
  navigation,
  updateFood,
  updateExcersize,
  foods,
  excersizes
}) => {
  // Basically fetching food
  const found: any = route.params.excersize
    ? excersizes.find(excersize => excersize.id === route.params.id)
    : foods.find(food => food.id === route.params.id)

  if (found) {
    return (
      <View>
        {route.params.excersize ? (
          <>
            <EntryForm
              entryCategory={'excersizes'}
              onSubmit={(excersize: { type: string; caloriesBurned: string }) =>
                updateExcersize(found.id, excersize, () => navigation.goBack())
              }
            />
          </>
        ) : (
          <>
            <EntryForm
              entryCategory={found.meal}
              onSubmit={(food: { name: string; calories: string }) =>
                updateFood(found.id, food, () => navigation.goBack())
              }
              initialValues={{
                name: found.name,
                calories: found.calories.toString()
              }}
            />
          </>
        )}
      </View>
    )
  } else {
    return <Text>Entry doesn't exist</Text>
  }
}

const mapStateToProps = ({ calories: { foods, excersizes } }: StoreState) => {
  return { foods, excersizes }
}

export default connect(mapStateToProps, { updateFood, updateExcersize })(Update)

const styles = StyleSheet.create({})
