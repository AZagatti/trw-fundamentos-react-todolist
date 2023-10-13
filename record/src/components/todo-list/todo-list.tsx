import { useEffect, useState } from 'react'
import { Input } from '../input/input'
import { Button } from '../button/button'
import { Todo as TodoItem } from '../todo/todo'
import * as S from './styles'
import { addTodo, deleteTodo, editTodo, getTodos } from '../../services/todos'
import type { Todo } from '../../services/todos'

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [editedTodo, setEditedTodo] = useState<Todo>()
  const [editedTodoName, setEditedTodoName] = useState('')

  useEffect(() => {
    getTodos().then(setTodos)
  }, [])

  const handleCreateTodo = async () => {
    if (!newTodo) return

    try {
      const data = await addTodo({ name: newTodo, completed: false })
      setTodos((state) => [...state, data])
      setNewTodo('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveTodo = async (id: number) => {
    try {
      await deleteTodo(id)
      setTodos((state) => state.filter((todo) => todo.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const data = await editTodo({ ...todo, completed: !todo.completed })
      setTodos((state) => state.map((t) => (t.id === todo.id ? data : t)))
    } catch (error) {
      console.error(error)
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
      console.error(error)
    }
  }

  return (
    <S.Container>
      <h2>Todo List</h2>
      <div>
        <Input
          placeholder="Nova tarefa"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={handleCreateTodo} disabled={!newTodo}>
          ADICIONAR
        </Button>
      </div>
      <div>
        <Input
          placeholder="Editar tarefa"
          type="text"
          disabled={!editedTodo}
          value={editedTodoName}
          onChange={(e) => setEditedTodoName(e.target.value)}
        />
        <Button disabled={!editedTodo} onClick={handleEditTodo} theme="confirm">
          CONFIRMAR
        </Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleRemoveTodo={handleRemoveTodo}
            handleSelectTodo={handleSelectTodo}
            handleToggleTodo={handleToggleTodo}
          />
        ))}
      </ul>
    </S.Container>
  )
}
