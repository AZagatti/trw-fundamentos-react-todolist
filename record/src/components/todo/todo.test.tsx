import { fireEvent, render, screen } from "@testing-library/react"
import { Todo } from "./todo"

const props = {
  todo: {
    id: 0,
    name: 'Lavar o carro',
    completed: false,
  },
  handleToggleTodo: vitest.fn(),
  handleSelectTodo: vitest.fn(),
  handleRemoveTodo: vitest.fn(),
}

describe('<Todo />', () => {
  it('can render correctly', () => {
    render(<Todo {...props} />)
    expect(screen.getByText(props.todo.name)).toBeInTheDocument()
  })
  it('can toggle todo completion', () => {
    render(<Todo {...props} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(props.handleToggleTodo).toBeCalledTimes(1)
  })
  it('can call handleSelectTodo on click "editar" button', () => {
    render(<Todo {...props} />)
    fireEvent.click(screen.getByText(/editar/i))
    expect(props.handleSelectTodo).toBeCalledTimes(1)
  })
  it('can call handleRemoveTodo on click "remover" button', () => {
    render(<Todo {...props} />)
    fireEvent.click(screen.getByText(/remover/i))
    expect(props.handleRemoveTodo).toBeCalledTimes(1)
  })
})