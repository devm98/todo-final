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
    isDisplay: true,
    valueSearch: "",
    dataVirtual: []
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
      this.setState({ data: newData, dataVirtual: newData });
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
  changeValueSearchHandler = e => {
    this.setState({ valueSearch: e.target.value });
  };
  submitValueSearchHandler = e => {
    e.preventDefault();
    let count = 0;
    const oldData = this.state.dataVirtual;
    for (let task of oldData) {
      if (task.title === this.state.valueSearch.trim()) {
        count++;
      }
    }
    console.log(count);
    if (count === 0) {
      this.setState({ data: oldData });
      alert("Not exists !!!");
    } else if (this.state.valueSearch === "") {
      this.setState({ data: oldData });
    } else {
      const newData = this.state.data.filter(task => {
        return task.title == this.state.valueSearch;
      });
      this.setState({ data: newData });
    }
    // this.setState({ data: oldData });
  };
  render() {
    return (
      <div className="container">
        <div className=" mt-2 mb-3 ">
          <h1 className="text-primary d-inline-block  mt-2 mb-3">App Todo</h1>
          <InputGroup popup={this.state.popup} add={this.addItemHandler} />
        </div>
        {this.state.data.length > 0 ? (
          <div>
            <div className="mb-2 mt-2">
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
              <form
                onSubmit={this.submitValueSearchHandler}
                style={{ float: "right" }}
                className="form-inline my-2 my-lg-0"
              >
                <input
                  onChange={this.changeValueSearchHandler}
                  value={this.state.valueSearch}
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <PopupNoticed
                idPopup={this.counterHandler() > 0 ? "removeChecked" : null}
                contentPopup="Are you sure remove task ?"
                noticedPopup={this.removeCheckedHandler}
              />
            </div>
            <h5 className="">
              Checked:{this.counterHandler()}/{this.state.data.length}
            </h5>
          </div>
        ) : null}

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
