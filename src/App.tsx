import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'react', isDone: true},
            {id: v1(), title: 'js', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'SQL', isDone: false},
            {id: v1(), title: 'DAL', isDone: true},
            {id: v1(), title: 'Thunk', isDone: true},
        ]
    });

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id != id)
        setTasks({...tasks});
    }

    /*function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }*/

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        filter={tl.filter}
                        changeFilter={changeFilter}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                    />
                })
            }
        </div>
    );
}

export default App;
