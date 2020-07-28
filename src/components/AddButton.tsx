import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const AddButton = () => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Add')}
    >
      <LinearGradient
        colors={['#6DCBE0', '#57FFBF']}
        style={[StyleSheet.absoluteFill, styles.gradient]}
      />
      <Feather name='plus' style={styles.plus} />
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
  plus: {
    fontSize: 35,
    color: '#373737'
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    padding: 16
  },
  gradient: {
    borderRadius: 50
  }
})
