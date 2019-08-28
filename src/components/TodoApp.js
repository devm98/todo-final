import React, { Component } from "react";
import InputGroup from "./InputGroup";
import ListItem from "./ListItem";
import Item from "./Item";
import NonTask from "./NonTask";
import { Remove } from "react-lodash";

export default class TodoApp extends Component {
  state = {
    data: [],
    checkItem: false
  };
  addItemHandler = title => {
    const newItem = {
      id: Date.now(),
      title: title,
      done: false
    };
    const newData = [...this.state.data, newItem];
    this.setState({ data: newData });
  };
  removeItemHandler = id => {
    const newData = this.state.data.filter(item => {
      return item.id !== id;
    });
    this.setState({ data: newData });
  };
  checkHandler = id => {
    const newData = this.state.data;
    const index = newData.findIndex(item => {
      return item.id == id;
    });
    newData[index].done = !newData[index].done;

    this.setState({ data: newData });
  };
  sortHandler = () => {
    const newData = this.state.data.sort((itemA, itemB) => {
      return itemA.done - itemB.done;
    });
    this.setState({ data: newData });
  };
  chekAllhandler = () => {
    const checker = this.state.checkItem;
    const data = this.state.data;
    for (let item of data) {
      if (checker) {
        item.done = false;
      } else {
        item.done = true;
      }
    }
    this.setState({ data: data, checkItem: !checker });
  };
  counterHandler = () => {
    const data = this.state.data;
    let checker = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].done === true) {
        checker++;
      }
    }
    return checker;
  };
  updateHandler = (title, id) => {
    const data = this.state.data;
    const index = data.findIndex(item => {
      return item.id === id;
    });
    data[index].title = title;
    console.log(index);
    console.log(data[index].title);
    this.setState({ data: data });
  };
  removeCheckedHandler = () => {
    const { data } = this.state;
    const newData = data.filter(item => {
      return item.done != true;
    });
    this.setState({ data: newData, checkItem: !this.state.checkItem });
  };
  render() {
    return (
      <div className="container">
        <h1 className="text-primary m-4">App Todo</h1>
        <InputGroup add={this.addItemHandler} />
        {this.state.data.length > 0 ? (
          <div className="text-left mb-4">
            <button
              onClick={this.chekAllhandler}
              className="btn btn-success mr-2"
            >
              {this.state.checkItem ? "Unchecked" : "Check all"}
            </button>
            <button
              onClick={this.sortHandler}
              className="btn btn-success  mr-2"
            >
              Sort by checked
            </button>
            <button
              onClick={this.removeCheckedHandler}
              className="btn btn-danger"
            >
              Delete checked
            </button>
          </div>
        ) : null}
        <h5 className="text-right">
          Checked:{this.counterHandler()}/{this.state.data.length}
        </h5>
        <ListItem>
          {this.state.data.length > 0 ? (
            this.state.data.map((item, index) => {
              return (
                <Item
                  done={item.done}
                  id={item.id}
                  title={item.title}
                  key={item.id}
                  stt={index + 1}
                  remove={this.removeItemHandler}
                  check={this.checkHandler}
                  update={this.updateHandler}
                />
              );
            })
          ) : (
            <NonTask />
          )}
        </ListItem>
      </div>
    );
  }
}
