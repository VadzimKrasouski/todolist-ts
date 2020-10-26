import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasksReducer';
import {todolistsReducer} from './todolistsReducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export const store= createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;


