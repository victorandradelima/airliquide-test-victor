import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import { ResponseData } from 'models'

const OverlayArea: React.FC<any> = (props: any) => {
  return (
    <Overlay isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View>
        <Text style={styles.title} >Confirmação do checklist</Text>
        <View style={styles.checklistConfirmArea}>
          {
            props.dataList.map((item: ResponseData, index: number) => {
              return <Text key={index}> {item.label}: {item.value ? 'Sim' : 'Não'} </Text>
            })
          }
        </View>
        <Button onPress={props.handleButton} title="Finalizar" type="solid"/>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18
  },
  checklistConfirmArea: {
    marginBottom: 16,
    marginTop: 16
  }
})

export default OverlayArea
