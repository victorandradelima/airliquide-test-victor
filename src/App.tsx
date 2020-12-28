import React from 'react'
import { ChecklistPage } from './pages'
import { Provider } from 'react-redux'
import { store } from './store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChecklistPage />
    </Provider>
  )
}

export default App
