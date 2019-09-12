import React, { Component } from "react";
import InputGroup from "./InputGroup";
import ListItem from "./ListItem";
import Item from "./Item";
import NonTask from "./NonTask";
import PopupNoticed from "./PopupNoticed";
import callApi from "./../utils/apiCaller";
export default class TodoApp extends Component {
  state = {
    data: [],
    checkItem: false,
    isDisplay: true,
    valueSearch: "",
    dataVirtual: []
  };
  // componentDidMount() {
  //   callApi("ListTask", "GET", null).then(res => {
  //     this.setState({ data: res.data });
  //   });
  // }

  addItemHandler = title => {
    let count = 0;
    const { data } = this.state;
    callApi("ListTask", "POST", {
      title: title,
      status: false
    }).then(res => {
      const newItem = {
        id: res.data.id,
        title: title,
        status: false
      };
      for (let i = 0; i < data.length; i++) {
        if (data[i].title === title) {
          count++;
        }
      }
      if (count !== 0) {
        alert("This title already exists !!!");
      } else {
        const newData = [...this.state.data, newItem];
        this.setState({ data: newData });
      }
    });
  };
  displayNoticedHandler = title => {
    const data = this.state.data;
    if (title.trim() === "") {
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
    callApi(`ListTask/${id}`, "DELETE", null).then(res => {
      console.log(res);
      if (res.status === 200) {
        const newData = this.state.data.filter(item => {
          return item.id !== id;
        });
        this.setState({ data: newData, dataVirtual: [], valueSearch: "" });
      }
    });
  };
  checkHandler = id => {
    const newData = this.state.data;

    const index = newData.findIndex(item => {
      return item.id === id;
    });
    let done = newData[index].status;
    newData[index].status = !done;
    this.setState({ data: newData });
    callApi(`ListTask/${id}`, "PUT", {
      status: !done
    }).then(res => {
      console.log(res);
    });
    console.log(this.state.data);
  };
  sortHandler = () => {
    const newData = this.state.data.sort((itemA, itemB) => {
      return itemA.status - itemB.status;
    });
    this.setState({ data: newData });
  };
  chekAllhandler = () => {
    // callApi(`ListTask`, "GET", null).then(res => {
    //   for (let i = 0; i < res.data.length; i++) {
    //     callApi(`ListTask/${res.data[i].id}`, "PUT", {
    //       status: true
    //     }).then(res => {
    //       console.log(res.data.status);
    //     });
    //   }
    // });
    const checker = this.state.checkItem;
    const data = this.state.data;
    for (var item of data) {
      if (checker) {
        item.status = false;
      } else {
        item.status = true;
      }
    }
    this.setState({ data: data, checkItem: !checker });
  };
  counterHandler = () => {
    const data = this.state.data;
    let checker = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === true) {
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

    this.setState({ data: data });
  };
  removeCheckedHandler = () => {
    const { data } = this.state;
    const newData = data.filter(item => {
      return item.status !== true;
    });
    this.setState({
      data: newData,
      checkItem: !this.state.checkItem,
      dataVirtual: [],
      valueSearch: ""
    });
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
    const newData = this.state.data.filter(task => {
      let title = task.title.toLowerCase();
      let value = this.state.valueSearch.toLowerCase();
      return title.includes(value);
    });
    this.setState({ dataVirtual: newData });
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
                <ListItem widths="100%">
                  {this.state.dataVirtual.map((item, index) => {
                    return (
                      <Item
                        data={this.state.data}
                        notice={this.state.notification}
                        status={item.status}
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
                  })}
                </ListItem>
              </form>
              <PopupNoticed
                idPopup={this.counterHandler() > 0 ? "removeChecked" : null}
                contentPopup="Are you sure remove task ?"
                noticedPopup={this.removeCheckedHandler}
              />
            </div>
            <h5 className="">
              Checked: {this.counterHandler()}/{this.state.data.length}
            </h5>
          </div>
        ) : null}

        <ListItem widths="50%">
          {this.state.data.length > 0 ? (
            this.state.data.map((item, index) => {
              return (
                <Item
                  data={this.state.data}
                  notice={this.state.notification}
                  status={item.status}
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
