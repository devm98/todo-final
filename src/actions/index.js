import * as types from "./../constants/";

const getListAll = () => {
  return {
    type: types.LIST_ALL
  };
};

const removeTask = id => {
  return {
    type: types.DEL_TASK,
    id
  };
};

const checkedTask = id => {
  return {
    type: types.CHECKED,
    id
  };
};

const changeValue = title => {
  return {
    type: types.CHANGE_TITLE,
    title
  };
};

const addTask = title => {
  return {
    type: types.ADD_TASK,
    title
  };
};

const cleanTitle = () => {
  return {
    type: types.CLEAN
  };
};

export {
  getListAll,
  removeTask,
  changeValue,
  addTask,
  cleanTitle,
  checkedTask
};
