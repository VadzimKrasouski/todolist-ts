import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: 'react', isDone: true},
        {id: 2, title: 'js', isDone: false},
        {id: 3, title: 'SQL', isDone: true},
        {id: 4, title: 'DAL', isDone: true},
        {id: 5, title: 'Thunk', isDone: true},
    ]);

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }

    /* const tasks2 = [
         {id:1, title: 'css', isDone: true},
         {id:2, title: 'sass', isDone: false},
         {id:3, title: 'html', isDone: true}
     ]*/
    function removeTask(id: number) {
        let filteredTask = tasks.filter(t => t.id != id);
        setTasks(filteredTask)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title={'Must have'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
