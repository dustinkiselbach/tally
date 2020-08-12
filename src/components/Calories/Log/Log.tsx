import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import LogSummary from './LogSummary'
import LogEntry from './LogEntry'
import { AddButton } from '../..'
import { connect } from 'react-redux'
import { StoreState } from '../../../redux/reducers/index'
import {
  Food,
  deleteFood,
  Meal,
  getGoal,
  getFoods,
  getExcersizes,
  Excersize,
  deleteExcersize
} from '../../../redux/actions'
import LogModal from './LogModal'

const meals: Meal[] = ['breakfast', 'lunch', 'dinner', 'snack']

interface LogProps {
  foods: Food[]
  excersizes: Excersize[]
  deleteFood: typeof deleteFood
  deleteExcersize: typeof deleteExcersize
  getGoal: typeof getGoal
  getFoods: typeof getFoods
  getExcersizes: typeof getExcersizes
  goal: number | null
}

const Log: React.FC<LogProps> = ({
  foods,
  excersizes,
  deleteFood,
  deleteExcersize,
  goal,
  getGoal,
  getFoods,
  getExcersizes
}) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getGoal()
    getFoods()
    getExcersizes()
  }, [])

  deleteExcersize

  return (
    <>
      <LogSummary {...{ foods, excersizes, goal }} />
      <ScrollView>
        {meals.map(meal => (
          <LogEntry
            entryCategory={meal}
            deleteEntry={(id: number) => deleteFood(id)}
            key={meal}
            entries={foods.filter(food => food.meal === meal)}
          />
        ))}
        <LogEntry
          entryCategory='excersizes'
          deleteEntry={(id: number) => deleteExcersize(id)}
          isExcersizes
          entries={excersizes}
        />
      </ScrollView>
      <LogModal {...{ showModal, setShowModal, meals }} />
      {showModal ? null : <AddButton onClick={setShowModal} />}
    </>
  )
}

const mapStateToProps = ({
  calories: { foods, excersizes },
  goals: { goal }
}: StoreState) => {
  return { foods, goal, excersizes }
}

export default connect(mapStateToProps, {
  deleteFood,
  deleteExcersize,
  getGoal,
  getFoods,
  getExcersizes
})(Log)

const styles = StyleSheet.create({})
