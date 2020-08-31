import React from 'react';
import './App.css';
import {TodoList} from './TodoList';

function App() {
    const tasks1 = [
        {id:1, title: 'react', isDone: true},
        {id:2, title: 'js', isDone: false},
        {id:3, title: 'SQL', isDone: true}
    ]
    const tasks2 = [
        {id:1, title: 'css', isDone: true},
        {id:2, title: 'sass', isDone: false},
        {id:3, title: 'html', isDone: true}
    ]

    return (
        <div className="App">
            <TodoList title={'Must have'} tasks={tasks1}/>
            <TodoList title={'list1'} tasks={tasks2}/>
        </div>
    );
}

export default App;
