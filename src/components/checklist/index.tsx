import CheckBox from '@react-native-community/checkbox'
import ResponseData from 'models/response-data'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Checklist: React.FC<any> = (props: any) => {
  return props.data.map((v: ResponseData) => (
    <View key={v.id} style={styles.checkboxContainer}>
      <CheckBox
        value={v.value}
        onValueChange={() => props.valueChange(v.id)}
        style={styles.checkbox}
      />
      <Text style={styles.label}>{v.label}</Text>
    </View>
  ))
}

const styles = StyleSheet.create({
  checkboxContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 5
  },
  checkbox: {
    alignSelf: 'stretch'
  },
  label: {
    margin: 8
  }
})

export default Checklist
