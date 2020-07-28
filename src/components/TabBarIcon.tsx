import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface TabBarIconProps {
  routeName: string
  focused: boolean
  color: string
  size: number
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  routeName,
  focused,
  color,
  size
}) => {
  let iconName = ''

  if (routeName === 'Calories') {
    iconName = 'clipboard'
  } else if (routeName === 'Goals') {
    iconName = 'trending-down'
  }

  // You can return any component that you like here!
  return <Feather name={iconName} size={size} color={color} />
}

export default TabBarIcon

const styles = StyleSheet.create({})
