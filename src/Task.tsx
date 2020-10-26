import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './Todolist';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task is called')
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    };
    const changeTaskTitle = useCallback((value: string) => {
        props.changeTaskTitle(props.task.id, value, props.todolistId)
    }, [props.task.id, props.changeTaskTitle, props.todolistId])
    return <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox color='primary' checked={props.task.isDone} onChange={onChangeHandler}/>
        <EditableSpan value={props.task.title} onChange={changeTaskTitle}/>
        <IconButton onClick={onRemoveHandler}>
            <Delete fontSize="small"/>
        </IconButton>
    </li>
})