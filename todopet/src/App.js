// import logo from './logo.svg';
// import './App.css';
import { useState, useRef } from "react";
import { TodoList } from "./components/index";
import { v4 as uuidv4} from "uuid";

//　Material UI　試し
import Button from '@mui/material/Button';


function App() {
  const [todos, setTodos] = useState([]);

  // useRef()要素を抽出する。
  const todoNameRef = useRef();

  const handleAddTodo = (e) => {
    // タスクを追加する
    // console.log(todoNameRef.current.value);
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      // ...スプレッド構文、タスクの追加
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}];
    });
    todoNameRef.current.value = null;
  }

  const toggleTodo = (id) => {
    // コピーしている　todosを変えるとレンダリングされるので
    const newTodos = [...todos];
    // find も　map　と似ている
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input id="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクの追加</button>
      <button onClick={handleClear}>タスクの削除</button>
      {/* tureのものだけを残す */}
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
      <Button variant="contained">Hello world</Button>
    </div>
  );
}

export default App;

// 初期のdiv内
// <header className="App-header">
// <img src={logo} className="App-logo" alt="logo" />
// <p>
//   Edit <code>src/App.js</code> and save to reload.
// </p>
// <a
//   className="App-link"
//   href="https://reactjs.org"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   Learn React
// </a>
// </header>
