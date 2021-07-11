import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

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
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}


export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist is called')
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

    const onRemoveTodolistHandler = useCallback(() => {
        props.removeTodolist(props.id);
    },[props.removeTodolist, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);

    let tasks = props.tasks;
    if (props.filter === 'active') {
        tasks = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasks = props.tasks.filter(t => t.isDone)
    }
    return (
        <div className='todolist'>
            <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={onRemoveTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                {tasks.map(task => {
                    return <Task key={task.id}
                                 task={task}
                                 todolistId={props.id}
                                 removeTask={props.removeTask}
                                 changeStatus={props.changeStatus}
                                 changeTaskTitle={props.changeTaskTitle}/>
                })}
            </ul>
            <div>
                <Button
                    color={props.filter === 'all' ? 'primary' : 'default'}
                    size={'small'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={props.filter === 'active' ? 'primary' : 'default'}
                    size={'small'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? 'primary' : 'default'}
                    size={'small'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
});


