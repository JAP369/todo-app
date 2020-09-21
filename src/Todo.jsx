import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from '@material-ui/core';
import React, { useState } from 'react';
import './Todo.css';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

// from https://material-ui.com/components/modal/ line:20-29 with sandbox
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// props = set keyword
function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    // update the todo with the new import text
    db.collection('todos')
      .doc(props.todo.id)
      .set({ todo: input }, { merge: true });

    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>I am a MODAL</h1>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            type='text'
          />
          <Button onClick={updateTodo} variant='contained' color='primary'>
            Update Todo
          </Button>
        </div>
      </Modal>
      <List className='todo__list'>
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary='due on ⏰' />
        </ListItem>
        <button onClick={(e) => setOpen(true)}>Edit</button>
        <DeleteForeverIcon
          onClick={(event) => {
            db.collection('todos').doc(props.todo.id).delete();
          }}
        />
      </List>
      {/* // <div className='todo'>
    //   <li>{props.text}</li>
    // </div> */}
    </>
  );
}

export default Todo;
