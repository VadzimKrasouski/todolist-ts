import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}


export function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => props.removeTask(t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked)
                    };
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type='checkbox' checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}
                            <button onClick={onRemoveHandler}>x</button></span>
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