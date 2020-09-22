import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);

    let [tasks, setTasks] = useState<TaskStateType>({
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

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

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
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks});
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks});
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        const task = todolistTasks.find(task => task.id === taskId);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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
                        addTask={addTask}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        changeFilter={changeFilter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default App;
