import React, { Component } from "react";
import InputGroup from "./InputGroup";
import ListItem from "./ListItem";
import Item from "./Item";
import NonTask from "./NonTask";

export default class TodoApp extends Component {
  state = {
    data: []
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
    const newData = this.state.data;

    for (let i = 0; i < newData.length; i++) {
      newData[i].done = true;
    }
    this.setState({ data: newData });
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
              className="btn btn-success mr-3"
            >
              Check All
            </button>
            <button onClick={this.sortHandler} className="btn btn-success">
              Sort by checked
            </button>
          </div>
        ) : null}

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
