import { useState } from "react"
import styles from './todo-list.module.css'
import { Input } from "../input/input"
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

  const handleRemoveTodo = (id: number) => {
    setTodos(state => state.filter(todo => todo.id !== id))
  }

  const handleCreateTodo = () => {
    setTodos(state => [...state, { id: incrementalId, name: newTodo, completed: false }])
    setNewTodo('')
    incrementalId++
  }

  const handleToggleTodo = (id: number) => {
    setTodos(state => state.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  const handleSelectTodo = (todo: TodoType) => {
    setEditedTodo(todo)
    setEditedTodoName(todo.name)
  }

  const handleEditTodo = () => {
    setTodos(state => state.map(todo => todo.id === editedTodo?.id ? { ...todo, name: editedTodoName } : todo))
    setEditedTodo(undefined)
    setEditedTodoName('')
  }

  return (
    <div className={styles.container}>
      <h2>Todo List</h2>
      <div className={styles.box}>
        <Input
          className={styles.boxInput}
          id="new-todo"
          placeholder="Nova tarefa"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <Button onClick={handleCreateTodo}>ADICIONAR</Button>
      </div>
      <div className={styles.box}>
        <Input
          disabled={!editedTodo}
          className={styles.boxInput}
          id="edit-todo"
          placeholder="Editar tarefa"
          value={editedTodoName}
          onChange={e => setEditedTodoName(e.target.value)}
        />
        <Button onClick={handleEditTodo} theme="confirm">CONFIRMAR</Button>
      </div>
      <div className={styles.list}>
        {todos.map(todo =>
          <Todo
            key={todo.id}
            todo={todo}
            handleRemoveTodo={handleRemoveTodo}
            handleToggleTodo={handleToggleTodo}
            handleSelectTodo={handleSelectTodo}
          />
        )}
      </div>
    </div>
  )
}