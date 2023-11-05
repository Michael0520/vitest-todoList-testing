import React, { useState } from 'react'

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState<string>('')

  const addTodo = (): void => {
    if (input.trim() !== '') {
      setTodos([...todos, input])
      setInput('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4 flex items-center justify-between">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mr-4 flex-1 rounded border-2 border-gray-300 bg-white p-2 transition duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="輸入待辦事項..."
        />
        <button
          onClick={addTodo}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white shadow-lg transition duration-200 ease-in-out hover:bg-blue-600"
        >
          新增
        </button>
      </header>
      <main>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className="my-2 rounded border-l-4 border-blue-500 bg-white p-4 shadow transition duration-200 ease-in-out hover:translate-x-2"
            >
              {todo}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default TodoList
