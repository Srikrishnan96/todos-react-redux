
import { connect } from 'react-redux';
import { useState } from 'react';

import store from '../todos-state/store';
import {addNewTask, editTaskHasSubTasks} from "../todos-state/action-creator";

function AddNewTask(props) {

    const [inputValue, setInputValue] = useState("");

    const inputChangeHandler = function(e) {
        setInputValue(e.target.value);
    }
    const taskNameInputKeyPressHandler = function (e) {
        if (e.charCode !== 13) return;

        const taskName = e.target.value;
        const taskPath = props.layers;
        const taskPathLastLayerIndex = taskPath.length-1;
        const superTaskIDOfNewTask = taskPath[taskPathLastLayerIndex].ID;

        if(taskName.trim() === "") return
        props.addNewTask(taskName, superTaskIDOfNewTask);
        setInputValue("");
    }
    const taskNameButtonOnClickHandler = function (e) {
        const taskPath = props.layers;
        const taskPathLastLayerIndex = taskPath.length-1;
        const superTaskIDOfNewTask = taskPath[taskPathLastLayerIndex].ID;

        if(inputValue.trim() === "") return;
        props.addNewTask(inputValue, superTaskIDOfNewTask);
        setInputValue("");
    }

    return (<div className={"add-new-task"}>
            <input
                placeholder={"Task name"}
                type={"text"}
                value={inputValue}
                onChange={inputChangeHandler}
                onKeyPress={taskNameInputKeyPressHandler}
            />
            <button onClick={taskNameButtonOnClickHandler}>Add task</button>
        </div>
    )
}

const mapStateToProps = function(state) {
    return {
        layers: state.taskPath.layers,
    };
}
const mapDispatchToProps = function(dispatch) {
    return {
        addNewTask: function(name, superTaskID) {
            dispatch(addNewTask(name, superTaskID));
        },
        editHasSubTasks: function(ID, newHasSubTasks) {
            dispatch(editTaskHasSubTasks(ID, newHasSubTasks))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTask);