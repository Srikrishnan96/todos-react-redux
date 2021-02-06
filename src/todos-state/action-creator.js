import {
    ADD_TASK, EDIT_TASK_HASSUBTASKS,
    EDIT_TASK_NAME, ADD_NEW_SUB_TASK_REGION,
    GET_TASK_LIST,
    GO_TO_LAYER,
    LAYER_UP,
    REMOVE_TASK,
    SWITCH_TASK_STATUS
} from "./action-types";

export function addNewTask(name, superTaskID) {
    return {
        type: ADD_TASK,
        payload: { name, superTaskID }
    };
};
export function removeTask(ID) {
    return {
        type: REMOVE_TASK,
        payload: { ID }
    };
};
export function switchTaskStatus(ID, newStatus) {
    return {
        type: SWITCH_TASK_STATUS,
        payload: { ID, newStatus }
    };
};
export function editTaskName(ID, newName) {
    return {
        type: EDIT_TASK_NAME,
        payload: { ID, newName }
    };
};
export function editTaskHasSubTasks(ID, newHasSubTasks) {
    return {
        type: EDIT_TASK_HASSUBTASKS,
        payload: { ID, newHasSubTasks }
    };
};
export function getTaskList(ID) {
    return {
        type: GET_TASK_LIST,
        payload: { ID }
    };
};
export function addNewSubTaskRegion(superTaskID) {
    return {
        type: ADD_NEW_SUB_TASK_REGION,
        payload: { superTaskID }
    }
}
export function layerUp(ID, name) {
    return {
        type: LAYER_UP,
        payload: { ID, name }
    }
};
export function goToLayer(index) {
    return {
        type: GO_TO_LAYER,
        payload: { index }
    }
};