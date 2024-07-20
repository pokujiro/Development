import React from 'react'
import {Todo} from './index'

const TodoList = ({todos, toggleTodo}) => {
  return (
    todos.map((todo) => <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo} />)
  )
}

// propsを利用した場合
// const TodoList = (props) => {
//   return (
//     <div>{props.todos}</div>
//   )
// }

export default TodoList