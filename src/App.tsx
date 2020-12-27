import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { api } from './infra'
import ResponseData from './models/response-data'
import { Header } from 'react-native-elements';

const App: React.FC = () => {
  const [data, setData] = useState([] as any)
  const [error, setError] = useState('')
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

  function valueChange(id: number | undefined) {
    const newData = data.map((item: ResponseData) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          value: !item.value,
        };
        return updatedItem;
      }
      return item;
    });
    setData(newData);
  }

  return (
    <>
      <Header
        centerComponent={{ text: 'EPI Checklist', style: { color: '#fff' } }}
      />
      <SafeAreaView style={styles.container}>
        
        {
          !error ? data.map((v: ResponseData) => (
            <View key={v.id} style={styles.checkboxContainer}>
              <CheckBox
                value={v.value}
                onValueChange={() => valueChange(v.id)}
                style={styles.checkbox}
              />
              <Text style={styles.label}>{v.label}</Text>
            </View>
            )) : <Text>Erro inexperado: {error}</Text>
        }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignSelf: "stretch",
    marginBottom: 5
  },
  checkbox: {
    alignSelf: "stretch"
  },
  label: {
    margin: 8,
  },
});

export default App