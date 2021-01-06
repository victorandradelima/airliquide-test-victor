/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import { api } from '../../infra'
import { ResponseData } from 'models'
import { AppBar, Checklist } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from 'store/createStore'
import { updateEpiList, getEpiList } from '../../store/modules/epi-checklist/actions'

const ChecklistPage: React.FC = () => {
  // Chamadas do estado Global
  const { epiList, errorMessage } = useSelector((state: StoreState) => state.epi)

  // Hooks do Redux para disparar actions
  const dispatch = useDispatch()

  const [dataEpiList, setDataEpiList] = useState([] as ResponseData | any)

  // Estado para controlar a visibilidade do Modal de confirmação
  const [visible, setVisible] = useState(false)

  // Hook para carregar inicialmente a lista de epi
  useEffect(() => {
    dispatch(getEpiList())
  }, [])

  useEffect(() => {
    if (epiList.length > 0) {
      setDataEpiList([])
      epiList.map((item: any, index: number) => {
        setDataEpiList((data: ResponseData[]) => data.concat({
          label: item.name,
          value: false,
          id: index
        }))
      })
    }
  }, [epiList])

  // Função para trocar a visibilidade do modal
  const confirmChecklist = () => {
    setVisible(!visible)
  }

  // Resetar checklist
  const resetChecklist = async () => {
    dispatch(getEpiList())
    confirmChecklist()
  }

  // funcão que irá atualizar o valor de cada checklist
  function valueChange (id: number | undefined) {
    const newData = dataEpiList.map((item: ResponseData) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          value: !item.value
        }
        return updatedItem
      }
      return item
    })
    dispatch(updateEpiList(newData))
    setDataEpiList(newData)
  }

  return (
    <>
      <AppBar title="EPI Checklist" />
      <SafeAreaView style={styles.container}>
        {!errorMessage
          ? <>
            <View style={styles.checklistArea} >
              <Checklist data={dataEpiList} valueChange={valueChange} />
            </View>
            <Button onPress={confirmChecklist} title="Confimar checklist" type="outline"/>
          </>
          : <Text>Erro inexperado: {errorMessage}</Text>}
      </SafeAreaView>
      <Overlay isVisible={visible} onBackdropPress={confirmChecklist}>
        <View>
          <Text style={styles.title} >Confirmação do checklist</Text>
          <View style={styles.checklistConfirmArea}>
            {
              dataEpiList.map((item: ResponseData, index: number) => {
                return <Text key={index}> {item.label}: {item.value ? 'Sim' : 'Não'} </Text>
              })
            }
          </View>
          <Button onPress={resetChecklist} title="Finalizar" type="solid"/>
        </View>
      </Overlay>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  checklistArea: {
    marginBottom: 24,
    marginTop: 24
  },
  title: {
    fontSize: 18
  },
  checklistConfirmArea: {
    marginBottom: 16,
    marginTop: 16
  }
})

export default ChecklistPage
