import { render, fireEvent, screen } from '@testing-library/react'

import TodoList from './TodoList'

describe('<TodoList />', () => {
  it('renders the todo list', () => {
    render(<TodoList />)
    expect(
      screen.getByPlaceholderText(/add a new task.../i)
    ).toBeInTheDocument()
  })

  it('allows users to add items to the list', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText(/add a new task.../i)
    const addButton = screen.getByRole('button', { name: /add/i })
    fireEvent.change(input, { target: { value: 'New Todo' } })
    fireEvent.click(addButton)
    expect(screen.getByText('New Todo')).toBeInTheDocument()
  })

  it('allows users to delete items from the list', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText(/add a new task.../i)
    const addButton = screen.getByRole('button', { name: /add/i })
    fireEvent.change(input, { target: { value: 'New Todo' } })
    fireEvent.click(addButton)
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)
    expect(screen.queryByText('New Todo')).not.toBeInTheDocument()
  })

  it('allows users to edit items in the list', async () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText(/add a new task.../i)
    const addButton = screen.getByRole('button', { name: /add/i })
    fireEvent.change(input, { target: { value: 'New Todo' } })
    fireEvent.click(addButton)

    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)

    const editInput = screen.getByDisplayValue('New Todo')
    fireEvent.change(editInput, { target: { value: 'Edited Todo' } })
    fireEvent.keyPress(editInput, { key: 'Enter', code: 'Enter' })

    const saveButton = screen.getByRole('button', { name: /save/i })
    fireEvent.click(saveButton)

    const editedTodo = await screen.findByText('Edited Todo')
    expect(editedTodo).toBeInTheDocument()
  })

  it('allows users to save edited items in the list', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText(/add a new task.../i)
    const addButton = screen.getByRole('button', { name: /add/i })
    fireEvent.change(input, { target: { value: 'New Todo' } })
    fireEvent.click(addButton)
    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)
    const editInput = screen.getByDisplayValue('New Todo')
    fireEvent.change(editInput, { target: { value: 'Edited Todo' } })
    const saveButton = screen.getByRole('button', { name: /save/i })
    fireEvent.click(saveButton)
    expect(screen.getByText('Edited Todo')).toBeInTheDocument()
  })
})
