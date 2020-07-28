import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Food, deleteFood } from '../../../redux/actions'

interface LogMealProps {
  meal: string
  foods: Food[]
  deleteFood: typeof deleteFood
}

const LogMeal: React.FC<LogMealProps> = ({ meal, foods, deleteFood }) => {
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
        { text: 'Delete', onPress: () => deleteFood(id) }
      ]
    )

  const navigation = useNavigation()
  // calculating total cals for meal
  const totalCals = foods.reduce((acc, { calories }) => acc + calories, 0)

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <LinearGradient
          colors={['#6DCBE0', '#57FFBF']}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.heading}>{meal}</Text>
        <Text style={styles.heading}>{totalCals}</Text>
      </View>
      <View style={styles.bodyContainer}>
        {foods.length > 0 ? (
          <>
            {foods.map(({ name, calories, id }, index) => (
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
        ) : null}
        <View style={styles.addFood}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add', { meal })}
          >
            <Feather name='plus' style={styles.plus} />
          </TouchableOpacity>
          <Text style={styles.body}>Add Food</Text>
        </View>
      </View>
    </View>
  )
}

export default LogMeal

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
