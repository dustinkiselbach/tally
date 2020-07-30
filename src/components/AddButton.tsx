import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

interface AddButtonProps {
  onClick: Dispatch<SetStateAction<boolean>>
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onClick(true)}>
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
    borderRadius: 100
  }
})
