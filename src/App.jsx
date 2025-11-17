import React from 'react'
import ReactHooks from './ReactHooks'
import TodoApp from './TodoApp'
import { AppProvider } from './AppContext'

function App() {
  return (
    <div>
      <AppProvider>
        <ReactHooks />
        <TodoApp />
      </AppProvider>
    
    </div>
  )
}

export default App