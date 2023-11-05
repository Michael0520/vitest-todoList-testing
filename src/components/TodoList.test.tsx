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

    // Simulate user typing a new todo item and submitting it
    fireEvent.change(input, { target: { value: 'New Todo' } })
    fireEvent.click(addButton)

    // The new todo item should be added to the list
    expect(screen.getByText('New Todo')).toBeInTheDocument()
  })

  it('allows users to delete items from the list', () => {
    // First, add an item to the list
    render(<TodoList />)
    const input = screen.getByPlaceholderText(/add a new task.../i)
    const addButton = screen.getByRole('button', { name: /add/i })
    fireEvent.change(input, { target: { value: 'New Todo' } })
    fireEvent.click(addButton)

    // Now delete the item
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)

    // The item should be removed from the list
    expect(screen.queryByText('New Todo')).not.toBeInTheDocument()
  })
})
