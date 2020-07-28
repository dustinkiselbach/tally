import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AddProps } from '../../../types/Types'
import { connect } from 'react-redux'
import { addFood, Meal } from '../../../redux/actions'
import { EntryForm } from '../..'

interface _AddProps extends AddProps {
  addFood: typeof addFood
}

const Add: React.FC<_AddProps> = ({ addFood, route, navigation }) => {
  return (
    <View>
      <Text>Add yer stuff here!!</Text>
      <EntryForm
        onSubmit={(food: { name: string; calories: string; meal: Meal }) =>
          addFood(food, () => navigation.goBack())
        }
        meal={route.params.meal}
      />
    </View>
  )
}

export default connect(null, { addFood })(Add)

const styles = StyleSheet.create({})
