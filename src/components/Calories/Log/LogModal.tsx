import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface LogModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  meals: string[]
}

const iconNames = ['sunrise', 'sun', 'sunset', 'clock']

const LogModal: React.FC<LogModalProps> = ({
  showModal,
  setShowModal,
  meals
}) => {
  const navigation = useNavigation()
  return (
    <>
      <Modal
        visible={showModal}
        transparent={true}
        animated={true}
        animationType='slide'
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setShowModal(!showModal)}
              style={styles.closeContainer}
            >
              <Feather name='x' style={styles.close} />
            </TouchableOpacity>
            <View style={styles.mealButtons}>
              {meals.map((item, index) => (
                <TouchableOpacity
                  key={item}
                  style={styles.mealButton}
                  onPress={() => {
                    setShowModal(!showModal)
                    navigation.navigate('Add', { meal: item })
                  }}
                >
                  <Feather name={iconNames[index]} style={styles.mealIcon} />
                  <Text style={styles.mealLabel}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default LogModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F5FFFB',
    borderRadius: 2,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeContainer: {
    position: 'absolute',
    right: 0,
    padding: 8
  },
  close: {
    fontSize: 20,
    color: '#373737'
  },
  mealButtons: {
    flexDirection: 'row'
  },
  mealButton: {
    alignItems: 'center',
    flex: 1
  },
  mealIcon: { color: '#373737', fontSize: 30 },
  mealLabel: {
    color: 'rgba(55, 55, 55, 0.85)',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize'
  }
})
