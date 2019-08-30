import React, { Component } from "react";

export default class Timer extends Component {
  state = {
    time: new Date()
  };

  componentDidMount() {
    this.timeCouter = setInterval(() => {
      this.ticktak();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timeCouter);
  }
  ticktak = () => {
    this.setState({ time: new Date() });
  };

  render() {
    return (
      <div
        style={{
          background: "#34495e",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "35px"
        }}
      >
        <h1 style={{ fontSize: "100px", color: "white" }}>
          {this.state.time.toLocaleDateString()}
          <br />
          {this.state.time.toLocaleTimeString()}
        </h1>
      </div>
    );
  }
}
