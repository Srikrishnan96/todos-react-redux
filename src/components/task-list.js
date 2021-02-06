import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import '../index.css';

import Task from './task';

function TaskList(props) {
    return (
        <div className={"task-list"}>
            <h4>{props.type.toUpperCase()}</h4>
            {
                props[`${props.type}List`].map(function(task) {
                    return <Task {...task} key={uuidv4()}/>
                })
            }
        </div>
    )
}

const mapStateToProps = function(state) {
    return {
        incompleteList: state.tasks.incompleteList,
        completedList: state.tasks.completedList,
    }
}

export default connect(mapStateToProps)(TaskList);