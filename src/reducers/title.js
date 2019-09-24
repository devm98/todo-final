import * as types from "./../constants";

const initState = "";

const myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.CHANGE_TITLE:
      console.log(action.title);
      return action.title;
    case types.CLEAN:
      return "";
    default:
      return state;
  }
};

export default myReducer;
