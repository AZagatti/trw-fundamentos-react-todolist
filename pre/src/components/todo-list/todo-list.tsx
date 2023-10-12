import { useEffect, useState } from 'react'
import { Input } from '../input/input'
import { Button } from '../button/button'
import { TodoItem } from '../todo/todo'
import * as S from './styles'
import type { Todo } from '../../services/todos'
import { addTodo, deleteTodo, editTodo, getTodos } from '../../services/todos'

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [editedTodo, setEditedTodo] = useState<Todo>()
  const [editedTodoName, setEditedTodoName] = useState('')

  useEffect(() => {
    getTodos().then(setTodos)
  }, [])

  const handleRemoveTodo = async (id: number) => {
    try {
      await deleteTodo(id)
      setTodos((state) => state.filter((todo) => todo.id !== id))
    } catch (error) {
      alert('Erro ao excluir.')
    }
  }

  const handleCreateTodo = async () => {
    if (!newTodo) return

    try {
      const data = await addTodo({ name: newTodo, completed: false })
      setTodos((state) => [...state, data])
      setNewTodo('')
    } catch (error) {
      alert('Erro ao criar.')
    }
  }

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const data = await editTodo({ ...todo, completed: !todo.completed })
      setTodos((state) => state.map((t) => (t.id === todo.id ? data : todo)))
    } catch (error) {
      alert('Erro ao alterar.')
    }
  }

  const handleSelectTodo = (todo: Todo) => {
    setEditedTodo(todo)
    setEditedTodoName(todo.name)
  }

  const handleEditTodo = async () => {
    if (!editedTodo) return

    try {
      const data = await editTodo({ ...editedTodo, name: editedTodoName })
      setTodos((state) =>
        state.map((todo) => (todo.id === editedTodo.id ? data : todo))
      )
      setEditedTodo(undefined)
      setEditedTodoName('')
    } catch (error) {
      alert('Erro ao editar.')
    }
  }

  return (
    <S.Container>
      <h2>Todo List</h2>
      <div>
        <Input
          id="new-todo"
          placeholder="Nova tarefa"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={handleCreateTodo} disabled={!newTodo}>
          ADICIONAR
        </Button>
      </div>
      <div>
        <Input
          disabled={!editedTodo}
          id="edit-todo"
          placeholder="Editar tarefa"
          value={editedTodoName}
          onChange={(e) => setEditedTodoName(e.target.value)}
        />
        <Button onClick={handleEditTodo} $theme="confirm">
          CONFIRMAR
        </Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleRemoveTodo={handleRemoveTodo}
            handleToggleTodo={handleToggleTodo}
            handleSelectTodo={handleSelectTodo}
          />
        ))}
      </ul>
    </S.Container>
  )
}
