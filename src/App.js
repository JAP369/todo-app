import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  // HOOK: shorterm memory: will reset when refreshed
  const [input, setInput] = useState('');
  console.log('⭐️', input);
  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  // useEffect(function, dependencies): Hook (Listener) that runs when the app loads
  useEffect(() => {
    // this code here...fires when the app.js loads
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data()));
        // setTodos(snapshot.docs.map((doc) => doc.data().todo)); // <--- Flat/empty array
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button
    // console.log('👌', 'Im a working button');

    // ...(spread) = keep values(in the shorterm memory) into array, input = new todo
    setTodos([...todos, input]);

    // adding data to the database via input
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // clear up input after clicking 'add todo' button
    setInput('');

    // event.preventDefault() = will stop the REFRESH
    event.preventDefault();
  };

  return (
    <div className='App'>
      <h1>Welcome to my first CRUD App!</h1>
      <form>
        <FormControl>
          <InputLabel>✅ write a todo</InputLabel>
          <Input
            type='text'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          type='submit'
          onClick={addTodo}
          variant='contained'
          color='primary'
        >
          Add Todo
        </Button>
      </form>

      {/* map() = es6 looping function
      todos = array, 
      todo = each item in the array
      () => (arrow function) means to return some html */}
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
