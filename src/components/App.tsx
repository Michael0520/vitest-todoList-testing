import React from 'react'
import TodoList from './TodoList'

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-pink-800 via-purple-800 to-indigo-800 p-4">
      <h1 className="mb-4 mt-8 text-4xl font-bold text-white shadow-lg">
        Todo List
      </h1>
      <div className="w-full max-w-3xl rounded-lg bg-white/30 p-6 shadow-xl backdrop-blur-md">
        <TodoList />
      </div>
    </div>
  )
}

export default App
