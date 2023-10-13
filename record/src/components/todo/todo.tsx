import type { Todo as TodoType } from '../../services/todos'
import { Button } from '../button/button'
import * as S from './styles'

interface TodoProps {
  todo: TodoType
  handleToggleTodo(todo: TodoType): void
  handleSelectTodo(todo: TodoType): void
  handleRemoveTodo(id: number): void
}

export const Todo = ({
  todo,
  handleToggleTodo,
  handleSelectTodo,
  handleRemoveTodo,
}: TodoProps) => {
  return (
    <S.Item $isCompleted={todo.completed}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleTodo(todo)}
      />
      <p>{todo.name}</p>
      <div>
        <Button onClick={() => handleSelectTodo(todo)} theme="edit">
          EDITAR
        </Button>
        <Button onClick={() => handleRemoveTodo(todo.id)} theme="remove">
          REMOVER
        </Button>
      </div>
    </S.Item>
  )
}
