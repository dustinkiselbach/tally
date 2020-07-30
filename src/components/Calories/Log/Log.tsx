import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import LogSummary from './LogSummary'
import LogMeal from './LogMeal'
import { AddButton } from '../..'
import { connect } from 'react-redux'
import { StoreState } from '../../../redux/reducers/index'
import {
  Food,
  deleteFood,
  Meal,
  getGoal,
  getFoods
} from '../../../redux/actions'
import LogModal from './LogModal'

const meals: Meal[] = ['breakfast', 'lunch', 'dinner', 'snack']

interface LogProps {
  foods: Food[]
  deleteFood: typeof deleteFood
  getGoal: typeof getGoal
  getFoods: typeof getFoods
  goal: number | null
}

const Log: React.FC<LogProps> = ({
  foods,
  deleteFood,
  goal,
  getGoal,
  getFoods
}) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getGoal()
    getFoods()
  }, [])

  return (
    <>
      <LogSummary {...{ foods, goal }} />
      <ScrollView>
        {meals.map(meal => (
          <LogMeal
            {...{ meal, deleteFood }}
            key={meal}
            foods={foods.filter(food => food.meal === meal)}
          />
        ))}
      </ScrollView>
      <LogModal {...{ showModal, setShowModal, meals }} />
      {showModal ? null : <AddButton onClick={setShowModal} />}
    </>
  )
}

const mapStateToProps = ({
  calories: { foods },
  goals: { goal }
}: StoreState) => {
  return { foods, goal }
}

export default connect(mapStateToProps, { deleteFood, getGoal, getFoods })(Log)

const styles = StyleSheet.create({})
