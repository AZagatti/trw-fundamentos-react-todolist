import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TodoList } from './todo-list'
import type { Todo } from '../../services/todos'

const mockTodoListNames = ['Lavar o carro', 'Ir ao mercado', 'Estudar React']

let mockedTodos: Todo[] = []
vitest.mock('../../services/todos.ts', () => {
  let id = 0
  return {
    getTodos: async () => [],
    getTodo: async (id: number) => mockedTodos.find((t) => t.id === id),
    addTodo: async (todo: Todo) => {
      const newTodo = { ...todo, id: id }
      mockedTodos.push(newTodo)
      id++
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

describe('<TodoList />', () => {
  beforeEach(() => {
    mockedTodos = []
  })
  it('can create new todo', async () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: 'Lavar o carro',
      },
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    await waitFor(() =>
      expect(screen.getByText(/lavar o carro/i)).toBeInTheDocument()
    )
  })
  it('can remove todo', async () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: 'Lavar o carro',
      },
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    fireEvent.click(await screen.findByText(/remover/i))
    await waitFor(() =>
      expect(screen.queryByText(/lavar o carro/i)).not.toBeInTheDocument()
    )
  })
  it('can edit todo', async () => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: 'Lavar o carro',
      },
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    fireEvent.click(await screen.findByText(/editar/i))
    fireEvent.change(screen.getByPlaceholderText(/editar tarefa/i), {
      target: {
        value: 'Ir ao mercado',
      },
    })
    fireEvent.click(screen.getByText(/confirmar/i))
    await waitFor(() =>
      expect(screen.getByText(/ir ao mercado/i)).toBeInTheDocument()
    )
  })
  it.each(mockTodoListNames)('can add %s on todo list', async (todo) => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: todo,
      },
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    await waitFor(() => expect(screen.getByText(todo)).toBeInTheDocument())
  })
  it.each(mockTodoListNames)('can remove %s on todo list', async (todo) => {
    render(<TodoList />)
    fireEvent.change(screen.getByPlaceholderText(/nova tarefa/i), {
      target: {
        value: todo,
      },
    })
    fireEvent.click(screen.getByText(/adicionar/i))
    fireEvent.click((await screen.findAllByText(/remover/i))[0])
    await waitFor(() =>
      expect(screen.queryByText(todo)).not.toBeInTheDocument()
    )
  })
})
