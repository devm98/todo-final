import * as types from "./../constants/index";
const initialState = [
  {
    id: 1111,
    title: "minh",
    done: false
  }
];

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    default:
      return state;
  }
};
export default myReducer;
