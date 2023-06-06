import React, {Fragment} from 'react';
import './App.css';

// compontnts

import InputTodo from "./components/input";
import ListTodos from './components/list';
function App() {
  return (
    <Fragment>
      <div className='container'>
      <InputTodo />
      <ListTodos />
      </div>
    </Fragment>
  );
};

export default App;
