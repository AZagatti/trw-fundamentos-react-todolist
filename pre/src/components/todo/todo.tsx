import { Button } from "../button/button"
import type { Todo } from "../../services/todos"
import * as S from './styles'

interface TodoProps {
  todo: Todo
  handleSelectTodo(todo: Todo): void
  handleToggleTodo(id: Todo): void
  handleRemoveTodo(id: number): void
}

export const TodoItem = ({ todo, handleToggleTodo, handleSelectTodo, handleRemoveTodo }: TodoProps) => {
  return (
    <S.Item $isCompleted={!!todo.completed}>
      <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo)} />
      <p>{todo.name}</p>
      <div>
        <Button onClick={() => handleSelectTodo(todo)} $theme="edit">EDITAR</Button>
        <Button onClick={() => handleRemoveTodo(todo.id)} $theme="remove">REMOVER</Button>
      </div>
    </S.Item>
  )
}