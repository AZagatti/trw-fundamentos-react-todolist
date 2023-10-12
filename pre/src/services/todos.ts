import { api } from './api'

export interface Todo {
  id: number
  name: string
  completed: boolean
}

export const getTodos = async () => {
  const { data } = await api<Todo[]>('todos')
  return data
}

export const getTodo = async (id: number) => {
  const { data } = await api<Todo>(`todos/${id}`)
  return data
}

export const addTodo = async (todo: Omit<Todo, 'id'>) => {
  const { data } = await api<Todo>('todos', {
    body: JSON.stringify(todo),
    method: 'POST',
  })
  return data
}

export const deleteTodo = async (id: number) => {
  await api(`todos/${id}`, {
    method: 'DELETE',
  })
  return true
}

export const editTodo = async (todo: Todo) => {
  const { data } = await api<Todo>(`todos/${todo.id}`, {
    body: JSON.stringify(todo),
    method: 'PUT',
  })
  return data
}
