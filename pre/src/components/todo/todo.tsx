import { Button } from "../button/button"
import type { TodoType } from "../todo-list/todo-list"
import styles from './todo.module.css'

interface TodoProps {
  todo: TodoType
  handleSelectTodo(todo: TodoType): void
  handleToggleTodo(id: number): void
  handleRemoveTodo(id: number): void
}

export const Todo = ({ todo, handleToggleTodo, handleSelectTodo, handleRemoveTodo }: TodoProps) => {
  return (
    <div className={styles.item}>
      <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
      <p className={todo.completed ? styles.completedTodo : ''}>{todo.name}</p>
      <div>
        <Button onClick={() => handleSelectTodo(todo)} theme="edit">EDITAR</Button>
        <Button onClick={() => handleRemoveTodo(todo.id)} theme="remove">REMOVER</Button>
      </div>
    </div>
  )
}