/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import { api } from '../../infra'
import { ResponseData } from 'models'
import { AppBar, Checklist } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from 'store/createStore'
import { updateEpiList } from '../../store/modules/epi-checklist/actions'

const ChecklistPage: React.FC = () => {
  // Chamadas do estado Global
  const epiData = useSelector((state: StoreState) => state.epi.data)
  const dispatch = useDispatch()

  // Estado local para armazenar a response da API
  const [data, setData] = useState([] as ResponseData | any)

  // Estado responsável para receber o erro e indicá-lo em caso positivo
  const [error, setError] = useState('')

  // Estado para controlar a visibilidade do Modal de confirmação
  const [visible, setVisible] = useState(false)

  // Função assíncrona que utiliza a API para receber os daddos
  const apiRequest = async () => {
    try {
      // const response = await api.get('epilist?key=52d6c330')
      const response = await api.get('names.json?key=b351b7e0') // API para testes
      response.data.map((item: any, index: number) => {
        setData((data: ResponseData[]) => data.concat({
          label: item.name,
          value: false,
          id: index
        }))
      })
    } catch (error) {
      setError(error.message ?? 'Houve um erro inexperado')
    }
  }

  // Hooks que monitora o estado local, para atualizar o estado global
  useEffect(() => {
    dispatch(updateEpiList(data))
  }, [data])

  // Hook para carregar os dados da API ao iniciar a aplicação
  useEffect(() => {
    setData([] as ResponseData)
    dispatch(updateEpiList([]))
    setError('')
    const onLoad = async (): Promise<void> => {
      await apiRequest()
    }
    onLoad()
  }, [])

  // Função para trocar a visibilidade do modal
  const confirmChecklist = () => {
    setVisible(!visible)
  }

  // Resetar checklist
  const resetChecklist = async () => {
    setData([] as ResponseData)
    dispatch(updateEpiList([]))
    setError('')
    await apiRequest()
    confirmChecklist()
  }

  // funcão que irá atualizar o valor de cada checklist dentro da estrutura do estado "data"
  function valueChange (id: number | undefined) {
    const newData = data.map((item: ResponseData) => {
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
    setData(newData)
  }

  return (
    <>
      <AppBar title="EPI Checklist" />
      <SafeAreaView style={styles.container}>
        {!error
          ? <>
            <View style={styles.checklistArea} >
              <Checklist data={epiData} valueChange={valueChange} />
            </View>
            <Button onPress={confirmChecklist} title="Confimar checklist" type="outline"/>
          </>
          : <Text>Erro inexperado: {error}</Text>}
      </SafeAreaView>
      <Overlay isVisible={visible} onBackdropPress={confirmChecklist}>
        <View>
          <Text style={styles.title} >Confirmação do checklist</Text>
          <View style={styles.checklistConfirmArea}>
            {
              epiData.map((item: ResponseData, index: number) => {
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
