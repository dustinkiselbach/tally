import 'react-native-gesture-handler'
import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { LoadAssets, TabBarIcon } from './src/components'
import { LinearGradient } from 'expo-linear-gradient'
import { Log, Add, Update } from './src/components/Calories'
import index from './src/components/Goals'
import { CaloriesStackParamList } from './src/types/Types'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

const fonts = {
  'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
}

const CaloriesStack = createStackNavigator<CaloriesStackParamList>()

const CaloriesStackScreen = () => {
  return (
    <CaloriesStack.Navigator
      screenOptions={{
        headerTintColor: '#373737',
        headerTitleStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 30,
          color: '#373737'
        },
        headerBackground: () => (
          <LinearGradient
            colors={['#6DCBE0', '#57FFBF']}
            style={StyleSheet.absoluteFill}
          />
        )
      }}
    >
      <CaloriesStack.Screen
        name='Log'
        component={Log}
        options={{ title: 'Tally' }}
      />
      <CaloriesStack.Screen name='Add' component={Add} />
      <CaloriesStack.Screen name='Update' component={Update} />
    </CaloriesStack.Navigator>
  )
}

const GoalsStack = createStackNavigator()

const GoalsStackScreen = () => {
  return (
    <GoalsStack.Navigator>
      <GoalsStack.Screen name='Goals' component={index} />
    </GoalsStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <LoadAssets {...{ fonts }}>
      <Provider {...{ store }}>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#FF5537',
            inactiveTintColor: '#373737'
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              // You can return any component that you like here!
              return (
                <TabBarIcon
                  routeName={route.name}
                  {...{ focused, color, size }}
                />
              )
            }
          })}
        >
          <Tab.Screen name='Calories' component={CaloriesStackScreen} />
          <Tab.Screen name='Goals' component={GoalsStackScreen} />
        </Tab.Navigator>
      </Provider>
    </LoadAssets>
  )
}

export default App
