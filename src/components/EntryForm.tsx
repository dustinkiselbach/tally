import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'
import { Meal } from '../redux/actions'

interface EntryFormProps {
  meal: Meal
  onSubmit: (food: any) => any
  initialValues?: { name: string; calories: string }
}

const EntryForm: React.FC<EntryFormProps> = ({
  meal,
  onSubmit,
  initialValues
}) => {
  const [newMeal, setNewMeal] = useState({
    name: initialValues!.name,
    calories: initialValues!.calories,
    meal
  })

  return (
    <View>
      <TextInput
        placeholder='name'
        onChangeText={e => setNewMeal({ ...newMeal, name: e })}
        value={newMeal.name}
      />
      <TextInput
        placeholder='calories'
        onChangeText={e => setNewMeal({ ...newMeal, calories: e })}
        value={newMeal.calories.toString()}
      />
      <Button
        title='submit'
        onPress={() => {
          onSubmit(newMeal)
        }}
      />
    </View>
  )
}

EntryForm.defaultProps = {
  initialValues: {
    name: '',
    calories: ''
  }
}

export default EntryForm

const styles = StyleSheet.create({})
