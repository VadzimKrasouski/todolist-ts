import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}


export function Todolist(props: PropsType) {

    function addTask(title: string) {
        props.addTask(title, props.id);
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    const onRemoveTodolistHandler = () => {
        props.removeTodolist(props.id);
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <button onClick={onRemoveTodolistHandler}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id, props.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    };
                    const changeTaskTitle = (value: string) => {
                        props.changeTaskTitle(t.id, value, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type='checkbox' checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan value={t.title} onChange={changeTaskTitle}/>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}


