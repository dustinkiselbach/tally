import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const cals = { goal: 1200, food: 1200, exersize: 200 }
const expressions = ['-', '+', '=']

const LogSummary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Calories Remaining</Text>
      <View style={styles.body}>
        {Object.keys(cals).map((key: string, index: number) => (
          <React.Fragment {...{ key }}>
            <View style={styles.item}>
              <Text style={styles.itemNumber}>
                {cals[key as keyof typeof cals]}
              </Text>
              <Text style={styles.itemLabel}>{key}</Text>
            </View>
            <Text>{expressions[index]}</Text>
          </React.Fragment>
        ))}
        <View style={styles.item}>
          <Text style={styles.itemNumber}>1234</Text>
          <Text style={styles.itemLabel}>remaining</Text>
        </View>
      </View>
    </View>
  )
}

export default LogSummary

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FFFB',
    padding: 16
  },
  heading: {
    fontSize: 16,
    color: '#373737',
    fontFamily: 'Poppins-Regular',
    marginBottom: 16
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemNumber: {
    fontSize: 18,
    color: '#373737',
    fontFamily: 'Poppins-Medium'
  },
  itemLabel: {
    fontSize: 16,
    color: 'rgba(55, 55, 55, 0.85)',
    textTransform: 'capitalize'
  }
})
