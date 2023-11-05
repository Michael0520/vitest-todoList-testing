import React, { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { TodoItemProps } from 'types'
import Todo from './TodoItem'

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
            placeholder="Add a new task..."
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-500 px-6 py-3 font-bold text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-600 hover:shadow-lg"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </form>
      </header>
      <main className="mx-auto w-full" data-testId="todo-list-container">
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
