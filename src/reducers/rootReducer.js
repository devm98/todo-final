import { combineReducers } from "redux";
import tasks from "./tasks";
import title from "./title";
const myReducer = combineReducers({
  tasks,
  title
});

export default myReducer;
