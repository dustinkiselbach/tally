import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AddProps } from '../../../types/caloriesTypes'
import { connect } from 'react-redux'
import { addFood, Meal } from '../../../redux/actions'
import { EntryForm } from '../..'
import { StoreState } from '../../../redux/reducers'

interface _AddProps extends AddProps {
  addFood: typeof addFood
  error: string | null
}

const Add: React.FC<_AddProps> = ({ addFood, route, navigation, error }) => {
  return (
    <View>
      <Text>Add yer stuff here!!</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <EntryForm
        onSubmit={(food: { name: string; calories: string; meal: Meal }) =>
          addFood(food, () => navigation.goBack())
        }
        meal={route.params.meal}
      />
    </View>
  )
}

const mapStateToProps = ({ calories: { error } }: StoreState) => {
  return { error }
}

export default connect(mapStateToProps, { addFood })(Add)

const styles = StyleSheet.create({})
