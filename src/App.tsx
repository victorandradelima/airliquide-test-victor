import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { api } from './infra'
import ResponseData from './models/response-data'
import { AppBar, Checklist } from './components'

const App: React.FC = () => {
  // Estado onde iremos armazenar nossa resposta no formato necessário para renderizar o checklist
  const [data, setData] = useState([] as any)

  // Estado responsável para receber o erro e indicá-lo em caso positivo
  const [error, setError] = useState('')

  // Hooks para carregar os dados da API
  useEffect(() => {
    // Este setData, serve para resetar o estado nos casos de hot reload.
    setData([])
    setError('')
    const onLoad = async (): Promise<void> => {
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
    onLoad()
  }, [])

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
        {!error ? <Checklist data={data} valueChange={valueChange} /> : <Text>Erro inexperado: {error}</Text>}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
