import React from 'react'
import TodoList from './TodoList'

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <TodoList />
    </div>
  )
}

export default App
