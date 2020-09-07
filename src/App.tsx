import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'react', isDone: true},
        {id: v1(), title: 'js', isDone: false},
        {id: v1(), title: 'SQL', isDone: false},
        {id: v1(), title: 'DAL', isDone: true},
        {id: v1(), title: 'Thunk', isDone: true},
    ]);

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function removeTask(id: string) {
        let filteredTask = tasks.filter(t => t.id !== id);
        setTasks(filteredTask)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title={'Must have'}
                      tasks={tasksForTodolist}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
