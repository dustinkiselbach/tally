import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AddProps } from '../../../types/caloriesTypes'
import { connect } from 'react-redux'
import { addFood, Meal, addExcersize } from '../../../redux/actions'
import { EntryForm } from '../..'
import { StoreState } from '../../../redux/reducers'

interface _AddProps extends AddProps {
  addFood: typeof addFood
  addExcersize: typeof addExcersize
  error: string | null
}

const Add: React.FC<_AddProps> = ({
  addFood,
  addExcersize,
  route,
  navigation,
  error
}) => {
  const {
    params: { entryCategory }
  } = route

  return (
    <View>
      <Text>Add yer stuff here!!</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <EntryForm
        onSubmit={
          entryCategory === 'excersizes'
            ? (excersize: { type: string; caloriesBurned: string }) =>
                addExcersize(excersize, () => navigation.goBack())
            : (food: { name: string; calories: string; meal: Meal }) =>
                addFood(food, () => navigation.goBack())
        }
        entryCategory={entryCategory}
      />
    </View>
  )
}

const mapStateToProps = ({ calories: { error } }: StoreState) => {
  return { error }
}

export default connect(mapStateToProps, { addFood, addExcersize })(Add)

const styles = StyleSheet.create({})
