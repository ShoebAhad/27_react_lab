// App.js
import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Home';
import Todo from './Todo';
// index.js or App.js


// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/task' element={<Todo/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
