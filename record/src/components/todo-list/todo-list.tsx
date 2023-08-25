import { useState } from "react"
import { Input } from "../input/input"
import styles from './todo-list.module.css'
import { Button } from "../button/button"
import { Todo } from "../todo/todo"

export interface TodoType {
  id: number
  name: string
  completed: boolean
}

let incrementalId = 0

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<TodoType[]>([])
  const [editedTodo, setEditedTodo] = useState<TodoType>()
  const [editedTodoName, setEditedTodoName] = useState('')

  const handleCreateTodo = (newId: number) => {
    incrementalId++
    setTodos(state =>
      [...state, { id: newId, name: newTodo, completed: false }]
    )
    setNewTodo('')
  }

  const handleRemoveTodo = (id: number) => {
    setTodos(state =>
      state.filter(todo => todo.id !== id)
    )
  }

  const handleToggleTodo = (id: number) => {
    setTodos(state => state.map(
      todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleSelectTodo = (todo: TodoType) => {
    setEditedTodo(todo)
    setEditedTodoName(todo.name)
  }

  const handleEditTodo = () => {
    setTodos(state =>
      state.map(todo => todo.id === editedTodo?.id ? { ...todo, name: editedTodoName } : todo)
    )
    setEditedTodo(undefined)
    setEditedTodoName('')
  }

  return (
    <div className={styles.container}>
      <h2>Todo List</h2>
      <div className={styles.box}>
        <Input
          placeholder="Nova tarefa"
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <Button onClick={() => handleCreateTodo(incrementalId)}>
          ADICIONAR
        </Button>
      </div>
      <div className={styles.box}>
        <Input
          placeholder="Editar tarefa"
          type="text"
          disabled={!editedTodo}
          value={editedTodoName}
          onChange={e => setEditedTodoName(e.target.value)}
        />
        <Button
          disabled={!editedTodo}
          onClick={handleEditTodo}
          theme="confirm"
        >
          CONFIRMAR
        </Button>
      </div>
      <div className={styles.list}>
        {todos.map(todo =>
          <Todo
            key={todo.id}
            todo={todo}
            handleRemoveTodo={handleRemoveTodo}
            handleSelectTodo={handleSelectTodo}
            handleToggleTodo={handleToggleTodo}
          />
        )}
      </div>
    </div>
  )
}
