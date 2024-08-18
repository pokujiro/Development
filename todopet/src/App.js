// import logo from './logo.svg';
// import './App.css';
import { useState, useRef, useEffect } from "react";
import { TodoList , CustomCalendar} from "./components/index";
import { v4 as uuidv4} from "uuid";
import axios from 'axios';

//　Material UI
import { Grid, Button, TextField, Typography, Paper } from '@mui/material';


function App() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pet, setPet] = useState({
    name: "dog",
    level: 1,
    affection: 0
  })
  // useRef()要素を抽出する。
  const todoNameRef = useRef();

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/tasks')
  //     .then(response => setTodos(response.data))
  //     .catch(error => console.error(error));
  // }, []);

  useEffect(() => {
    fetchTasks(selectedDate);
  }, [selectedDate]);

  // 2024-08-16T15:00:00.000Z　←　console.log(date.toISOString())の結果
  const fetchTasks = async(date) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tasks/${date.toISOString().split('T')[0]}`);
      setTodos(response.data);
      console.log("fetch:",response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }


  const handleAddTodo = async(e) => {
    // タスクを追加する
    // console.log(todoNameRef.current.value);
    const name = todoNameRef.current.value;
    if (name === "") return;

    // 非同期処理を動的に処理し、エラー検出
    // uuidv4()はテキストデータ
    try {
      const newTask = {
        id: uuidv4(), 
        name,
        completed: false,
        date: selectedDate.toISOString().split('T')[0]
      };
      await axios.post('http://localhost:8000/api/tasks', newTask);
      console.log(newTask);
      setTodos((prevTodos) => {
        // ...スプレッド構文、タスクの追加
        return [...prevTodos, newTask]; 
      });
      updatePetAffection(3);
    }catch(error){
      console.error(error);
    }
    todoNameRef.current.value = null;
  }

  

  const toggleTodo = async (id) => {
    // コピーしている　todos を変えるとレンダリングされるので
    const newTodos = [...todos];
    // find も　map　と似ている
    const todo = newTodos.find((todo) => todo.id === id);
    // newTodosの要素も同時に変更されている
    todo.completed = !todo.completed;

    try{
      await axios.put(`http://localhost:8000/api/tasks/${id}`,{completed:todo.completed});
      setTodos(newTodos);
    } catch (error) {
      console.error("Error updating task", error);
    }
    
  }

  const handleClear = async () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    const completedCount = completedTodos.length;
    console.log(completedCount.length);
    // const newTodos = todos.filter((todo) => !todo.completed);
    // setTodos(newTodos);
    try {
      await Promise.all(completedTodos.map(todo => axios.delete(`http://localhost:8000/api/tasks/${todo.id}`)));
      setTodos(todos.filter((todo) => !todo.completed));
      updatePetAffection(20 * completedCount);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const updatePetAffection = (points) => {
    setPet(prevPet => {
      const newAffection = prevPet.affection + points;
      if(newAffection >= 100){
        return {
          ...prevPet,
          affection: newAffection % 100,
          level: prevPet.level + 1
        };
      } else {
        return {
          ...prevPet,
          affection: newAffection
        };
      }
    });
  }

  return (
    <Grid container spacing={1.5} style={{ padding: 20 }}>
    {/* タイトルエリア */}
    <Grid item xs={12}>
      <Paper style={{ padding: 20, textAlign: 'center', backgroundColor: '#E0E0E0', height: '300px' }}>
        <Typography 
          variant="h2" 
          style={{ marginBottom: 20 }} // アイコンの下に余白を追加
        >
        <div style={{ height: '80px'}}>
        </div>
          <span role="img" aria-label="dog" style={{ fontSize: '100px' }}>🐶</span>
        </Typography>
        <div style={{ marginTop: 30 }}>
          {pet.name} - レベル: {pet.level} - 愛情度: {pet.affection}
        </div>
      </Paper>
    </Grid>


    {/* タスクリストエリア */}
    <Grid item xs={8}>
      <Paper style={{ padding: 20, backgroundColor: '#D3D3D3', height: '300px' }}>
      <Typography variant="h5">{selectedDate.toDateString()}</Typography>
        <div style={{ marginTop: 10 ,height: '180px'}}>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        <div style={{ marginTop: 10 ,height: '100px'}}>
          <TextField id="text" inputRef={todoNameRef} label="New Task" variant="outlined" style={{ marginTop: 10 }} />
          <Button variant="contained" onClick={handleAddTodo} style={{ marginTop: 20,  marginLeft: 10, marginRight: 10, backgroundColor: '#ADD8E6' }}>追加</Button>
          <Button variant="contained" color="secondary" onClick={handleClear} style={{ marginTop: 20,backgroundColor: '#FFB6C1' }}>削除</Button>
        </div>
        {/*<div style={{ marginTop: 10 }}>残りのタスク: {todos.filter((todo) => !todo.completed).length}</div>*/}
      </Paper>
    </Grid>

    {/* カレンダーエリア */}
    <Grid item xs={4}>
      <Paper style={{ padding: 20, backgroundColor: '#D3D3D3', textAlign: 'center', height: '300px'  }}>
      <CustomCalendar onDateChange={handleDateChange} /> {/* カレンダーコンポーネントをここに表示 */}
      </Paper>
    </Grid>
  </Grid>

    // <div>
    //   <TodoList todos={todos} toggleTodo={toggleTodo}/>
    //   <p></p>
    //   <TextField id="text" inputRef={todoNameRef} label="New Task" variant="outlined" />
    //   <Button variant="contained" onClick={handleAddTodo}>タスクの追加</Button>
    //   <Button variant="contained" color="secondary" onClick={handleClear}>タスクの削除</Button>
    //   {/* tureのものだけを残す */}
    //   <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    // </div>
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
