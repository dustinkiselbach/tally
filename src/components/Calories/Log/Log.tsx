import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import LogSummary from './LogSummary'
import LogMeal from './LogMeal'
import { AddButton } from '../..'
import { connect } from 'react-redux'
import { StoreState } from '../../../redux/reducers/index'
import { Food, deleteFood } from '../../../redux/actions'

const meals = ['breakfast', 'lunch', 'dinner', 'snacks']

interface LogProps {
  foods: Food[]
  deleteFood: typeof deleteFood
}

const Log: React.FC<LogProps> = ({ foods, deleteFood }) => {
  return (
    <>
      <LogSummary />
      <ScrollView>
        {meals.map(meal => (
          <LogMeal
            {...{ meal, deleteFood }}
            key={meal}
            foods={foods.filter(food => food.meal === meal)}
          />
        ))}
      </ScrollView>
      <AddButton />
    </>
  )
}

const mapStateToProps = ({ calories: { foods } }: StoreState) => {
  return { foods }
}

export default connect(mapStateToProps, { deleteFood })(Log)

const styles = StyleSheet.create({})
