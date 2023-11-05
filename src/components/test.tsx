import { render, screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  it('should render the Todo List heading', () => {
    render(<App />)

    const heading = screen.getByRole('heading', {
      name: /todo list/i,
      level: 1
    })
    expect(heading).toBeInTheDocument()

    const todoListContainer = screen.getByTestId('todo-list-container')
    expect(todoListContainer).toBeInTheDocument()
  })
})
