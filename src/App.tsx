import React, { useEffect, useState } from 'react';
import { api } from './infra'
import ResponseData from './models/response-data'
import { StyleSheet, Text, View } from 'react-native'

const App: React.FC = () => {
  const [data, setData] = useState([] as any)
  useEffect(() => {
    const onLoad = async (): Promise<void> => {
      try {
        const response = await api.get('epilist?key=52d6c330')
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    onLoad()
  }, [setData])

  return (
    <View style={styles.container}>
      {data.map((v: ResponseData) => <Text>{v.name}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App