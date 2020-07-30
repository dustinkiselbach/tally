import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { Meal } from '../redux/actions'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'

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
      <TouchableOpacity
        onPress={() => {
          onSubmit(newMeal)
        }}
      >
        <LinearGradient
          colors={['#6DCBE0', '#57FFBF']}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>submit</Text>
        </LinearGradient>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  submitButton: {
    padding: 16,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
    color: '#373737'
  }
})
