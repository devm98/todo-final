import React, { Component } from "react";
import InputGroup from "./InputGroup";
import ListItem from "./ListItem";
import Item from "./Item";
import NonTask from "./NonTask";
import PopupNoticed from "./PopupNoticed";

export default class TodoApp extends Component {
  state = {
    data: [],
    checkItem: false,
    isDisplay: true
  };
  addItemHandler = title => {
    let count = 0;
    const { data } = this.state;
    const newItem = {
      id: Date.now(),
      title: title,
      done: false
    };
    for (let task of data) {
      if (task.title === title) {
        count++;
      }
    }
    if (count !== 0) {
      alert("This title already exists !!!");
    } else {
      const newData = [...this.state.data, newItem];
      this.setState({ data: newData });
    }
  };
  displayNoticedHandler = title => {
    const data = this.state.data;
    if (title.trim() == "") {
      this.setState({
        isDisplay: false
      });
      return null;
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.trim() === title.trim()) {
        this.setState({ isDisplay: false });
        return false;
      }
    }
    // for (let task of this.state.data) {
    //   if (task.title.trim() === title.trim()) {
    //     this.setState({ isDisplay: false });
    //     return false;
    //   }
    // }
    this.setState({ isDisplay: true });
    return true;
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

    this.setState({ data: data, noticed: false });
  };
  removeCheckedHandler = () => {
    const { data } = this.state;
    const newData = data.filter(item => {
      return item.done != true;
    });
    this.setState({ data: newData, checkItem: !this.state.checkItem });
  };
  displayChecked = () => {
    let count = 0;
    const { data } = this.state;
    for (let i = 0; i < data.length; i++) {
      if (data[i].done === true) {
        count++;
      }
    }
    if (count === data.length) {
      this.state.checkItem = true;
    } else {
      this.state.checkItem = false;
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-primary mb-4">App Todo</h1>
        <InputGroup popup={this.state.popup} add={this.addItemHandler} />
        {this.state.data.length > 0 ? (
          <div className="text-left mb-4">
            <button
              onClick={this.chekAllhandler}
              className="btn btn-success mr-2"
            >
              {this.displayChecked()}
              {this.state.checkItem ? "Unchecked" : "Check all"}
            </button>
            <button
              onClick={this.sortHandler}
              className="btn btn-success  mr-2"
            >
              Sort by checked
            </button>
            <button
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#removeChecked"
            >
              Delete checked
            </button>
            <PopupNoticed
              idPopup={this.counterHandler() > 0 ? "removeChecked" : null}
              contentPopup="Are you sure remove task ?"
              noticedPopup={this.removeCheckedHandler}
            />
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
                  data={this.state.data}
                  notice={this.state.notification}
                  done={item.done}
                  id={item.id}
                  title={item.title}
                  key={item.id}
                  stt={index + 1}
                  remove={this.removeItemHandler}
                  check={this.checkHandler}
                  update={this.updateHandler}
                  displayNoticed={this.displayNoticedHandler}
                  display={this.state.isDisplay}
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
