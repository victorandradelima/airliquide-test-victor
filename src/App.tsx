import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { api } from './infra'
import ResponseData from './models/response-data'
import { AppBar, Checklist } from './components'
import { Button, Overlay } from 'react-native-elements'

const App: React.FC = () => {
  // Estado onde iremos armazenar nossa resposta no formato necessário para renderizar o checklist
  const [data, setData] = useState([] as any)

  // Estado responsável para receber o erro e indicá-lo em caso positivo
  const [error, setError] = useState('')

  // Estado para controlar a visibilidade do Modal de confirmação
  const [visible, setVisible] = useState(false)

  // Função assíncrona que utiliza a API para receber os daddos
  const apiRequest = async () => {
    try {
      // const response = await api.get('epilist?key=52d6c330')
      const response = await api.get('names.json?key=b351b7e0')
      response.data.map((item: any, index: number) => {
        setData((data: any[]) => data.concat({
          label: item.name,
          value: false,
          id: index
        }))
      })
    } catch (error) {
      setError(error.message ?? 'Houve um erro inexperado')
    }
  }

  // Hook para carregar os dados da API ao iniciar a aplicação
  useEffect(() => {
    setData([])
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
    setData([])
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
    setData(newData)
  }

  return (
    <>
      <AppBar title="EPI Checklist" />
      <SafeAreaView style={styles.container}>
        {!error
          ? <>
            <View style={styles.checklistArea} >
              <Checklist data={data} valueChange={valueChange} />
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
              data.map((item: ResponseData, index: number) => {
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

export default App
