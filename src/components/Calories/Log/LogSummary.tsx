import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Food, Excersize } from '../../../redux/actions'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface LogSummaryProps {
  foods: Food[]
  excersizes: Excersize[]
  goal: number | null
}

const expressions = ['-', '+', '=']

const LogSummary: React.FC<LogSummaryProps> = ({ foods, excersizes, goal }) => {
  const navigation = useNavigation()
  const food = foods.reduce((acc, { calories }) => acc + calories, 0)
  const excersize = excersizes.reduce(
    (acc, { caloriesBurned }) => acc + caloriesBurned,
    0
  )

  let body

  if (goal) {
    const cals = { goal, food, excersize }
    const remaining = cals.goal - food + cals.excersize

    body = (
      <>
        {Object.keys(cals).map((key: string, index: number) => (
          <React.Fragment {...{ key }}>
            <View style={styles.item}>
              <Text style={styles.itemNumber}>
                {cals[key as keyof typeof cals]}
              </Text>
              <Text style={styles.itemLabel}>{key}</Text>
            </View>
            <Text>{expressions[index]}</Text>
          </React.Fragment>
        ))}
        <View style={styles.item}>
          <Text
            style={[
              styles.itemNumber,
              remaining < 0 ? { color: '#dc3545' } : { color: '#FF5537' }
            ]}
          >
            {remaining}
          </Text>
          <Text style={styles.itemLabel}>remaining</Text>
        </View>
      </>
    )
  } else {
    body = (
      <>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => navigation.navigate('Goals')}
        >
          <Feather name='plus' style={styles.plus} />
          <Text style={[styles.itemNumber, { color: '#FF5537' }]}>
            You have no goal. Please add a goal.
          </Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Calories Remaining</Text>
      <View style={styles.body}>{body}</View>
    </View>
  )
}

export default LogSummary

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FFFB',
    padding: 16
  },
  heading: {
    fontSize: 16,
    color: '#373737',
    fontFamily: 'Poppins-Regular',
    marginBottom: 16
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemNumber: {
    fontSize: 18,
    color: '#373737',
    fontFamily: 'Poppins-Medium'
  },
  itemLabel: {
    fontSize: 16,
    color: 'rgba(55, 55, 55, 0.85)',
    textTransform: 'capitalize'
  },
  plus: {
    fontSize: 24,
    color: '#FF5537',
    marginRight: 5
  }
})
