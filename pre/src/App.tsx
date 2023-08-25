// import { useState } from "react"
// import styles from './app.module.css'

// interface Todo {
//   id: number
//   name: string
//   completed: boolean
// }

// let incrementalId = 0

// function App() {
//   const [newTodo, setNewTodo] = useState('')
//   const [todos, setTodos] = useState<Todo[]>([])
//   const [editedTodo, setEditedTodo] = useState<Todo>()
//   const [editedTodoName, setEditedTodoName] = useState('')

//   const handleRemoveTodo = (id: number) => {
//     setTodos(state => state.filter(todo => todo.id !== id))
//   }

//   const handleCreateTodo = () => {
//     setTodos(state => [...state, { id: incrementalId, name: newTodo, completed: false }])
//     setNewTodo('')
//     incrementalId++
//   }

//   const handleToggleTodo = (id: number) => {
//     setTodos(state => state.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
//   }

//   const handleSelectTodo = (todo: Todo) => {
//     setEditedTodo(todo)
//     setEditedTodoName(todo.name)
//   }

//   const handleEditTodo = () => {
//     setTodos(state => state.map(todo => todo.id === editedTodo?.id ? { ...todo, name: editedTodoName } : todo))
//     setEditedTodo(undefined)
//     setEditedTodoName('')
//   }

//   return (
//     <div className={styles.container}>
//       <h2>Todo List</h2>
//       <div className={styles.box}>
//         <input
//           className={styles.boxInput}
//           type="text"
//           id="new-todo"
//           placeholder="Nova tarefa"
//           value={newTodo}
//           onChange={e => setNewTodo(e.target.value)}
//         />
//         <button className={styles.base} onClick={handleCreateTodo}>ADICIONAR</button>
//       </div>
//       <div className={styles.box}>
//         <input
//           disabled={!editedTodo}
//           className={styles.boxInput}
//           type="text"
//           id="edit-todo"
//           placeholder="Editar tarefa"
//           value={editedTodoName}
//           onChange={e => setEditedTodoName(e.target.value)}
//         />
//         <button onClick={handleEditTodo} className={styles.confirm}>CONFIRMAR</button>
//       </div>
//       <div className={styles.list}>
//         {todos.map(todo => (
//           <div key={todo.id} className={styles.item}>
//             <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
//             <p className={todo.completed ? styles.completedTodo : ''}>{todo.name}</p>
//             <div>
//               <button onClick={() => handleSelectTodo(todo)} className={styles.edit}>EDITAR</button>
//               <button onClick={() => handleRemoveTodo(todo.id)} className={styles.remove}>REMOVER</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

import { Home } from "./pages/home"

const App = () => {
  return <Home />
}

export default App
