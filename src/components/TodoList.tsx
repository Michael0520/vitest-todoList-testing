import React, { useState } from 'react'

interface Todo {
  id: number
  text: string
  isEditing: boolean
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>('')

  const addTodo = (): void => {
    if (input.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(), // 簡單使用時間戳作為唯一ID
        text: input,
        isEditing: false
      }
      setTodos([...todos, newTodo])
      setInput('')
    }
  }

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    )
  }

  const saveTodo = (id: number, newText: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    )
  }

  return (
    <div className="container mx-auto flex flex-col p-4">
      <header className="mx-auto mb-6 flex max-w-2xl items-center justify-between">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mr-4 flex-1 rounded-lg border-2 border-gray-300 bg-white p-3 transition duration-200 ease-in-out focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="輸入待辦事項..."
        />
        <button
          onClick={addTodo}
          className="rounded-lg bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg"
        >
          新增
        </button>
      </header>
      <main className="mx-auto max-w-2xl">
        <ul>
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              className="my-4 flex items-center justify-between gap-4 rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow transition-all duration-200 ease-in-out hover:shadow-md"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                {index + 1}
              </span>
              {todo.isEditing ? (
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) =>
                    setTodos(
                      todos.map((item) =>
                        item.id === todo.id
                          ? { ...item, text: e.target.value }
                          : item
                      )
                    )
                  }
                  className="mr-4 flex-1 rounded-lg border-2 border-gray-300 p-3"
                  autoFocus // Automatically focus on the edit input
                />
              ) : (
                <span className="mr-4 flex-1 truncate">{todo.text}</span>
              )}
              <button
                onClick={() =>
                  todo.isEditing
                    ? saveTodo(todo.id, todo.text)
                    : editTodo(todo.id)
                }
                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-white transition-all duration-200 ease-in-out hover:bg-green-600"
              >
                {todo.isEditing ? '儲存' : '編輯'}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all duration-200 ease-in-out hover:bg-red-600"
              >
                刪除
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default TodoList
