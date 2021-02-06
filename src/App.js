import { useEffect } from 'react';

import TaskPathBreadCrumb from "./components/task-path-bread-crumb";
import AddNewTask from "./components/add-new-task";
import TaskList from "./components/task-list";

import store from './todos-state/store';
import {getTaskList, layerUp} from "./todos-state/action-creator";

function App() {

    useEffect(function() {
        store.dispatch(getTaskList("HOME"));
        store.dispatch(layerUp("HOME", "HOME"));
    }, []);

  return (
    <div className="todos-app">
      <h2>TODOS APP</h2>
      <TaskPathBreadCrumb />
      <AddNewTask />
      <TaskList type={"incomplete"}/>
      <TaskList type={"completed"}/>
    </div>
  );
}

export default App;
