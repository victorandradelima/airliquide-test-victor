import React from 'react'
import { Header } from 'react-native-elements'

const AppBar: React.FC<any> = (props: any) => {
  return <Header centerComponent={{ text: props.title, style: { color: '#fff' } }} />
}

export default AppBar
