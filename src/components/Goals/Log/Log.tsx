import React from 'react'
import { StyleSheet, View, Button, AsyncStorage } from 'react-native'
import GoalForm from '../../GoalForm'
import { connect } from 'react-redux'
import { updateGoal } from '../../../redux/actions'

interface LogProps {
  updateGoal: typeof updateGoal
}

const Log: React.FC<LogProps> = ({ updateGoal }) => {
  return (
    <View>
      <GoalForm onSubmit={updateGoal} />
      <Button
        title='test'
        onPress={() =>
          (async () => console.log(await AsyncStorage.getItem('goal')))()
        }
      />
    </View>
  )
}

export default connect(null, { updateGoal })(Log)

const styles = StyleSheet.create({})
