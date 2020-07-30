import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { updateGoal } from '../redux/actions'
import { useNavigation } from '@react-navigation/native'

interface GoalFormProps {
  onSubmit: typeof updateGoal
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
  const [goal, setGoal] = useState('2000')
  const navigation = useNavigation()
  return (
    <View>
      <TextInput
        placeholder='goal'
        value={goal.toString()}
        onChangeText={e => setGoal(e)}
      />
      <Button
        title='submit'
        onPress={() =>
          onSubmit(parseInt(goal), () => navigation.navigate('Calories'))
        }
      />
    </View>
  )
}

export default GoalForm
