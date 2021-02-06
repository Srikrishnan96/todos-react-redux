import { combineReducers } from 'redux';

import {
    ADD_NEW_SUB_TASK_REGION,
    ADD_TASK, EDIT_TASK_HASSUBTASKS,
    EDIT_TASK_NAME, GET_NEW_LIST_REGION,
    GET_TASK_LIST,
    GO_TO_LAYER,
    LAYER_UP,
    REMOVE_TASK,
    SWITCH_TASK_STATUS
} from "./action-types";

import {TaskListModel, TaskModel} from '../app-local-storage';
import task from "../components/task";

const initialTaskListState = {
    incompleteList: [],
    completedList: [],
};
const initialTaskPathState = {
    layers: [],
}
const getIncompleteTasks = function(tasks) {

    return tasks.reduce(function(acc, task) {
        if(task.status === "incomplete") acc.push(task);
        return acc;
    }, []);
}
const getCompletedTasks = function(tasks) {
    return tasks.reduce(function(acc, task) {
        if(task.status === "completed") acc.push(task);
        return acc;
    }, []);
}

function tasksReducer(state = initialTaskListState, action) {
    if(action.type === REMOVE_TASK) {
        const deletedTask = TaskModel.deleteTask(action.payload.ID);
        const status = deletedTask.status;
        const sameStatusListName = `${status}List`;

        return {...state,
            // if task is incomplete updates incompleteList else updates completedList
            [sameStatusListName]: state[sameStatusListName].filter(function(task) {
                    return task.ID !== deletedTask.ID
            })}
    }
    if(action.type === ADD_TASK) {
        const { name, superTaskID } = action.payload;
        const newTask = TaskModel.createNewTask(name, superTaskID);

        return {
            ...state,
            incompleteList: [...state.incompleteList, newTask]
        };
    }
    if(action.type === SWITCH_TASK_STATUS) {
        const INVERSE = {
            completed: "incomplete",
            incomplete: "completed",
        };
        const { ID, newStatus } = action.payload;
        const updatedTask = TaskModel.updateTask("status", newStatus, ID);
        const { status, ID: updatedID} = updatedTask;
        const sameStatusListName = `${status}List`;
        const otherStatusListName = `${INVERSE[status]}List`;

        return {
            ...state,
            [sameStatusListName]: [...state[sameStatusListName], updatedTask],
            [otherStatusListName]: state[otherStatusListName].filter(function(task) {
                return task.ID !== updatedID;
            })
        }
    }
    if(action.type === GET_TASK_LIST) {
        const tasks = TaskListModel.getTasksList(action.payload.ID);
        const incompleteList = getIncompleteTasks(tasks);
        const completedList = getCompletedTasks(tasks);

        return {
            ...state,
            incompleteList,
            completedList,
        }
    }
    if(action.type === ADD_NEW_SUB_TASK_REGION) {
        return {
            ...state,
            incompleteList: [],
            completedList: [],
        }
    }
    if(action.type === EDIT_TASK_NAME) {
        const {newName, ID} = action.payload;
        const updatedTask = TaskModel.updateTask("name", newName, ID);
        const sameStatusListName = `${updatedTask.status}List`;

        return {
            ...state,
            // if task is incomplete updates incompleteList else updates completedList
            [sameStatusListName]: state[sameStatusListName].map(function(task) {
                return task.ID === updatedTask.ID ? updatedTask : task;
            })
        }
    }
    if(action.type === EDIT_TASK_HASSUBTASKS) {
        const {newHasSubTasks, ID} = action.payload;
        const updatedTask = TaskModel.updateTask("hasSubTasks", newHasSubTasks, ID);
        const sameStatusListName = `${updatedTask.status}List`;

        return {
            ...state,
            // if task is incomplete updates incompleteList else updates completedList
            [sameStatusListName]: state[sameStatusListName].map(function(task) {
                return task.ID === updatedTask.ID ? updatedTask : task;
            })
        }
    }

    return state;
}

function taskPathReducer(state = initialTaskPathState, action) {
    if(action.type === LAYER_UP) {
        const { ID, name } = action.payload;
        return {
            layers: [...state.layers, { ID, name }]
        }
    }
    if(action.type === GO_TO_LAYER) {
        const { index } = action.payload;
        return {
            layers: state.layers.slice(0, index+1)
        }
    }
    return state;
}

export default combineReducers({ tasks: tasksReducer, taskPath: taskPathReducer });