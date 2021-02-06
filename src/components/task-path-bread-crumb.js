import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import '../index.css';

import { goToLayer, getTaskList} from "../todos-state/action-creator";

function TaskPathBreadCrumb(props) {

    const isLastLayer = function(index) {
        return index+1 >= props.layers.length;
    }

    const goToLayerHandler = function(index, ID) {
        props.goToLayer(index);
        props.getTasksList(ID);
    }

    return (
        <div className={"task-path"}>
            {
                props.layers.map(function(layer, index) {
                    return <span className={"layer"} key={uuidv4()}>
                            {
                                layer.ID === "HOME" ?
                                    <span
                                        className={"layer-name"}
                                        onClick={
                                        isLastLayer(index) ? null :
                                        function(e) {
                                            goToLayerHandler(index, layer.ID);
                                        }
                                    }>
                                        {layer.name}
                                    </span> :
                                    <>
                                        <span className={"layer-divider"}>{" / "}</span>
                                        <span
                                            className={"layer-name"}
                                            onClick={
                                            isLastLayer(index) ? null :
                                            function(e) {
                                                goToLayerHandler(index, layer.ID);
                                            }
                                        }>
                                            {layer.name}
                                        </span>
                                    </>
                            }
                        </span>
                })
            }
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
        goToLayer: function(index) { dispatch(goToLayer(index)) },
        getTasksList: function(superTaskID) {
            dispatch(getTaskList(superTaskID));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPathBreadCrumb);