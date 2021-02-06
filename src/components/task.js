import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    addNewSubTaskRegion,
    editTaskName,
    getTaskList, layerUp,
    removeTask,
    switchTaskStatus
} from "../todos-state/action-creator";
import '../index.css';

function Task(props) {
    const STATUS_SWITCH_LABEL = {
        incomplete: "Mark completed",
        completed: "Mark incomplete",
    };
    const INVERSE = {
        completed: "incomplete",
        incomplete: "completed",
    }
    const { ID, name, status, superTaskID, hasSubTasks, addNewSubTaskRegion,
        getSubTasks, editName, removeTask, switchStatus, layerUpPath } = props;

    const [editNameInputValue, setEditNameInputValue] = useState(name);
    const [showEditNameInput, setShowEditNameInput] = useState(false);

    const editNameInputChangeHandler = function(e) { setEditNameInputValue(e.target.value) };
    const editNameHandler = function(e) { setShowEditNameInput(true) };
    const removeHandler = function(e) { removeTask(ID) };
    const addNewSubTaskhandler = function(e) { addNewSubTaskRegion(ID); layerUpPath(ID, name); };
    const getSubTasksHandler = function(e) { getSubTasks(ID); layerUpPath(ID, name); };
    const statusSwitchHandler = function(e) { switchStatus(ID, INVERSE[status]) };
    const onNewNameHandler = function(e) {
        if(e.charCode !== 13) return;
        editName(ID, editNameInputValue);
        setShowEditNameInput(false);
    };

    useEffect(function() {
    }, [showEditNameInput]);

    return (
        <div taskid={ID} supertaskid={superTaskID} className={"task-container"}>
            <button className={"sub-task-maker"} onClick={addNewSubTaskhandler}>
                Add
            </button>
            {showEditNameInput ?
                <input
                    value={editNameInputValue}
                    onChange={editNameInputChangeHandler}
                    onKeyPress={onNewNameHandler}
                /> :
                <span className={"task-name"} onClick={hasSubTasks ? getSubTasksHandler: null}>
                    {name}
                </span>}
            <button className={"task-name-editor"} onClick={editNameHandler}>
                Edit
            </button>
            <button className={"task-remover"} onClick={removeHandler}>
                Remove
            </button>
            <button className={"task-status-switch"} onClick={statusSwitchHandler}>
                {STATUS_SWITCH_LABEL[status]}
            </button>
        </div>
    );
}

const mapDispatchToProps = function(dispatch) {
    return {
        removeTask: function(ID) {
            dispatch(removeTask(ID));
        },
        editName: function(ID, name) {
            dispatch(editTaskName(ID, name));
        },
        addNewSubTaskRegion: function(superTasKID) {
            dispatch(addNewSubTaskRegion(superTasKID));
        },
        getSubTasks: function(superTaskID) {
            dispatch(getTaskList(superTaskID));
        },
        switchStatus: function(ID, newStatus) {
            dispatch(switchTaskStatus(ID, newStatus));
        },
        layerUpPath: function(ID, name) {
            dispatch(layerUp(ID, name));
        }
    }
}

export default connect(null, mapDispatchToProps)(Task);