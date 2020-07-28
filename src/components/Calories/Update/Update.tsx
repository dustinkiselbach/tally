import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { EntryForm } from '../..'
import { UpdateProps } from '../../../types/Types'
import { connect } from 'react-redux'
import { updateFood, Food } from '../../../redux/actions'
import { StoreState } from '../../../redux/reducers'

interface _UpdateProps extends UpdateProps {
  updateFood: typeof updateFood
  foods: Food[]
}

const Update: React.FC<_UpdateProps> = ({
  route,
  navigation,
  updateFood,
  foods
}) => {
  // Basically fetching food
  const foundFood = foods.find(food => food.id === route.params.id)

  if (foundFood) {
    return (
      <View>
        <EntryForm
          meal={foundFood.meal}
          onSubmit={(food: { name: string; calories: string }) =>
            updateFood(foundFood.id, food, () => navigation.goBack())
          }
          initialValues={{
            name: foundFood.name,
            calories: foundFood.calories.toString()
          }}
        />
      </View>
    )
  } else {
    return <Text>Entry doesn't exist</Text>
  }
}

const mapStateToProps = ({ calories: { foods } }: StoreState) => {
  return { foods }
}

export default connect(mapStateToProps, { updateFood })(Update)

const styles = StyleSheet.create({})
