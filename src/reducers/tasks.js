import * as types from "./../constants";

const initState = [{ id: 1, title: "minh 2", done: false }];

const myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.DEL_TASK:
      const newTasks = [...state];
      const taskFillter = newTasks.filter(item => {
        return item.id !== action.id;
      });
      return taskFillter;
    case types.ADD_TASK:
      console.log(action);
      const newTask = {
        id: Date.now(),
        title: action.title,
        done: false
      };
      const newTasks1 = [...state, newTask];
      return newTasks1;
    case types.CHECKED:
      const tasks = [...state];
      const idx = tasks.findIndex(item => {
        return item.id === action.id;
      });
      tasks[idx].done = !tasks[idx].done;
      return tasks;
    default:
      return state;
  }
};

export default myReducer;
