import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoList } from './todo-list'
import { Todo } from '../../services/todos'

const mockTodoListNames = ['Lavar o carro', 'Ir ao mercado', 'Estudar React']

vitest.mock('../../services/todos.ts', () => {
  let mockedTodos: Todo[] = []
  return {
    getTodos: async () => [],
    getTodo: async (id: number) => mockedTodos.find((t) => t.id === id),
    addTodo: async (todo: Todo) => {
      const newTodo = { ...todo, id: Math.random() }
      mockedTodos.push(newTodo)
      return newTodo
    },
    deleteTodo: async (id: number) => {
      mockedTodos = mockedTodos.filter((t) => t.id !== id)
      return true
    },
    editTodo: async (todo: Todo) => {
      mockedTodos = mockedTodos.map((t) => (t.id === todo.id ? todo : t))
      return todo
    },
  }
})

const user = userEvent.setup()

describe('<TodoList />', () => {
  it('can create new todo', async () => {
    render(<TodoList />)
    await user.type(
      screen.getByPlaceholderText(/nova tarefa/i),
      'Lavar o carro'
    )
    await user.click(screen.getByText(/adicionar/i))
    expect(screen.getByText(/lavar o carro/i)).toBeInTheDocument()
  })
  it('can remove todo', async () => {
    render(<TodoList />)
    await user.type(
      screen.getByPlaceholderText(/nova tarefa/i),
      'Lavar o carro'
    )
    await user.click(screen.getByText(/adicionar/i))
    await user.click(screen.getByText(/remover/i))
    expect(screen.queryByText(/lavar o carro/i)).not.toBeInTheDocument()
  })
  it('can edit new todo', async () => {
    // ARRANGE
    render(<TodoList />)

    // ACT
    await user.type(
      screen.getByPlaceholderText(/nova tarefa/i),
      'Lavar o carro'
    )
    await user.click(screen.getByText(/adicionar/i))
    await user.click(screen.getByText(/editar/i))
    await user.clear(screen.getByPlaceholderText(/editar tarefa/i))
    await user.type(
      screen.getByPlaceholderText(/editar tarefa/i),
      'Ir ao mercado'
    )
    await user.click(screen.getByText(/confirmar/i))

    // ASSERT
    expect(screen.queryByText(/lavar o carro/i)).not.toBeInTheDocument()
    expect(screen.getByText(/ir ao mercado/i)).toBeInTheDocument()
  })
  it.each(mockTodoListNames)('can render %s on todo list', async (todo) => {
    render(<TodoList />)
    await user.type(screen.getByPlaceholderText(/nova tarefa/i), todo)
    await user.click(screen.getByText(/adicionar/i))
    expect(screen.getByText(todo)).toBeInTheDocument()
  })
  it.each(mockTodoListNames)('can remove %s on todo list', async (todo) => {
    render(<TodoList />)
    await user.type(screen.getByPlaceholderText(/nova tarefa/i), todo)
    await user.click(screen.getByText(/adicionar/i))
    await user.click(screen.getByText(/remover/i))
    expect(screen.queryByText(todo)).not.toBeInTheDocument()
  })
})
