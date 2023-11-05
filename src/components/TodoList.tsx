import React, { useState } from 'react'

interface TodoItemProps {
  id: number
  content: string
  isInEditMode: boolean
}

const Todo = ({
  todo,
  onToggleEditMode,
  onDelete,
  onSave
}: {
  todo: TodoItemProps
  onToggleEditMode: (id: number) => void
  onDelete: (id: number) => void
  onSave: (id: number, content: string) => void
}) => {
  const [newContent, setNewContent] = useState(todo.content)

  return (
    <li className="my-4 flex items-center justify-between rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow transition-all duration-300 ease-in-out hover:bg-blue-100">
      {todo.isInEditMode ? (
        <>
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSave(todo.id, newContent)
              }
            }}
            className="mr-4 flex-1 rounded-lg border-2 border-gray-300 p-3"
            autoFocus
          />

          <button
            onClick={() => onSave(todo.id, newContent)}
            className="rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-green-600"
          >
            儲存
          </button>
        </>
      ) : (
        <>
          <span className="mr-4 flex-1 truncate">{todo.content}</span>
          <button
            onClick={() => onToggleEditMode(todo.id)}
            className="rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-green-600"
          >
            編輯
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="ml-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-red-600"
          >
            刪除
          </button>
        </>
      )}
    </li>
  )
}

const TodoList: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItemProps[]>([])
  const [newTodoContent, setNewTodoContent] = useState<string>('')

  const handleAddTodo = (content: string) => {
    if (content.trim() !== '') {
      const newTodo: TodoItemProps = {
        id: Date.now(),
        content: content.trim(),
        isInEditMode: false
      }
      setTodoItems(todoItems.concat(newTodo))
      setNewTodoContent('')
    }
  }

  const handleDeleteTodo = (id: number) => {
    setTodoItems(todoItems.filter((todo) => todo.id !== id))
  }

  const handleToggleEditMode = (id: number) => {
    setTodoItems(
      todoItems.map((todo) =>
        todo.id === id ? { ...todo, isInEditMode: !todo.isInEditMode } : todo
      )
    )
  }

  const handleSaveTodo = (id: number, content: string) => {
    setTodoItems(
      todoItems.map((todo) =>
        todo.id === id ? { ...todo, content, isInEditMode: false } : todo
      )
    )
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoContent(event.target.value)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleAddTodo(newTodoContent)
  }

  return (
    <div className="container mx-auto flex flex-col p-4">
      <header className="mx-auto mb-6 flex max-w-2xl items-center justify-between">
        <form onSubmit={handleFormSubmit} className="flex w-full">
          <input
            type="text"
            value={newTodoContent}
            onChange={handleInputChange}
            className="mr-4 flex-1 rounded-lg border-2 border-gray-300 bg-white p-3 transition duration-200 ease-in-out focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="輸入待辦事項..."
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg"
          >
            新增
          </button>
        </form>
      </header>
      <main className="mx-auto max-w-2xl">
        <ul>
          {todoItems.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onToggleEditMode={handleToggleEditMode}
              onDelete={handleDeleteTodo}
              onSave={handleSaveTodo}
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default TodoList
