import { fireEvent, render, screen } from '@testing-library/react'
import { TodoList } from './todo-list'

const mockTodoListNames = [
  'Lavar o carro',
  'Ir ao mercado',
  'Estudar React'
]

describe('<TodoList />', () => {
  it('can create new todo', () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: 'Lavar o carro'
      }
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    expect(screen.getByText(/lavar o carro/i)).toBeInTheDocument()
  })
  it('can remove todo', () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: 'Lavar o carro'
      }
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    fireEvent.click(screen.getByText(/remover/i))
    expect(screen.queryByText(/lavar o carro/i)).not.toBeInTheDocument()
  })
  it('can edit todo', () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: 'Lavar o carro'
      }
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    fireEvent.click(screen.getByText(/editar/i))
    fireEvent.change(screen.getByPlaceholderText(/editar tarefa/i), {
      target: {
        value: 'Ir ao mercado'
      }
    })
    fireEvent.click(screen.getByText(/confirmar/i))
    expect(screen.getByText(/ir ao mercado/i)).toBeInTheDocument()
  })
  it.each(mockTodoListNames)('can add %s on todo list', (todo) => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: todo
      }
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    expect(screen.getByText(todo)).toBeInTheDocument()
  })
  it.each(mockTodoListNames)('can remove %s on todo list', (todo) => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: todo
      }
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    fireEvent.click(screen.getAllByText(/remover/i)[0])
    expect(screen.queryByText(todo)).not.toBeInTheDocument()
  })
})


