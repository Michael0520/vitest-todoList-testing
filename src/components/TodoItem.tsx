import { useState } from 'react'
import { TodoItemProps } from 'types'
import { cn } from 'utils'
import { Pencil2Icon, TrashIcon, CheckIcon } from '@radix-ui/react-icons'

interface TodoProps {
  todo: TodoItemProps
  onToggleEditMode: (id: number) => void
  onDelete: (id: number) => void
  onSave: (id: number, content: string) => void
}
const Todo: React.FC<TodoProps> = ({
  todo,
  onToggleEditMode,
  onDelete,
  onSave
}) => {
  const [newContent, setNewContent] = useState(todo.content)

  return (
    <li
      className={cn(
        'my-4 flex items-center justify-between rounded-lg p-4 shadow transition-all duration-300 ease-in-out',
        {
          'border-l-4 border-blue-500 bg-white hover:bg-blue-100':
            !todo.isInEditMode
        },
        { 'border-l-4 border-green-500 bg-green-50': todo.isInEditMode }
      )}
    >
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
            <CheckIcon className="h-6 w-4" />
          </button>
        </>
      ) : (
        <>
          <span className="mr-4 flex-1 truncate">{todo.content}</span>
          <button
            onClick={() => onToggleEditMode(todo.id)}
            className="rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-green-600"
          >
            <Pencil2Icon className="h-6 w-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="ml-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:bg-red-600"
          >
            <TrashIcon className="h-6 w-4" />
          </button>
        </>
      )}
    </li>
  )
}

export default Todo
