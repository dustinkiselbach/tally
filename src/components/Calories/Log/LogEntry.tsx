import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { deleteFood, Meal, Excersize, Food } from '../../../redux/actions'
import {
  UpdateScreenNavigationProp,
  AddScreenNavigationProp
} from '../../../types/caloriesTypes'

interface LogEntryProps {
  entryCategory: Meal | 'excersizes'
  // not sure how to fix this.
  entries: any[]
  deleteEntry: typeof deleteFood
  isExcersizes?: boolean
}

const LogEntry: React.FC<LogEntryProps> = ({
  entryCategory,
  entries,
  deleteEntry,
  isExcersizes
}) => {
  const deleteAlert = (id: number) =>
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Delete', onPress: () => deleteEntry(id) }
      ]
    )

  const navigation = useNavigation<
    UpdateScreenNavigationProp | AddScreenNavigationProp
  >()
  // calculating total cals for meal
  const totalCals = isExcersizes
    ? entries.reduce(
        (acc, { caloriesBurned }: Excersize) => acc + caloriesBurned,
        0
      )
    : entries.reduce((acc, { calories }: Food) => acc + calories, 0)

  let entryItems

  if (isExcersizes) {
    entryItems = (
      <>
        {entries.map(({ type, caloriesBurned, id }: Excersize, index) => (
          <TouchableOpacity
            key={index}
            style={styles.foodItem}
            onLongPress={() => deleteAlert(id)}
            onPress={() =>
              navigation.navigate('Update', { id, excersize: true })
            }
          >
            <Text style={styles.foodName}>{type}</Text>

            <Text style={styles.foodCalories}>{caloriesBurned}</Text>
          </TouchableOpacity>
        ))}
      </>
    )
  } else {
    entryItems = (
      <>
        {entries.map(({ name, calories, id }: Food, index) => (
          <TouchableOpacity
            key={index}
            style={styles.foodItem}
            onLongPress={() => deleteAlert(id)}
            onPress={() => navigation.navigate('Update', { id })}
          >
            <Text style={styles.foodName}>{name}</Text>

            <Text style={styles.foodCalories}>{calories}</Text>
          </TouchableOpacity>
        ))}
      </>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <LinearGradient
          colors={['#6DCBE0', '#57FFBF']}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.heading}>{entryCategory}</Text>
        <Text style={styles.heading}>{totalCals}</Text>
      </View>
      <View style={styles.bodyContainer}>
        {entries.length > 0 ? entryItems : null}

        <TouchableOpacity
          style={styles.addFood}
          onPress={() => navigation.navigate('Add', { entryCategory })}
        >
          <Feather name='plus' style={styles.plus} />

          <Text style={styles.body}>Add Entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LogEntry

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: '#F5FFFB'
  },
  headingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heading: {
    fontSize: 16,
    color: '#373737',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize'
  },
  body: {
    fontSize: 14,
    color: '#373737',
    fontFamily: 'Poppins-Bold'
  },
  plus: {
    fontSize: 24,
    color: '#373737',
    marginRight: 5
  },

  bodyContainer: {
    padding: 16
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  foodName: {
    fontSize: 16,
    color: '#373737',
    fontFamily: 'Poppins-Regular',
    flex: 1
  },
  foodCalories: {
    fontSize: 16,
    color: '#373737',
    fontFamily: 'Poppins-Medium'
  },
  addFood: {
    flexDirection: 'row'
  }
})
