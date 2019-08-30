import React from "react";
import "./App.css";
import TodoApp from "./components/TodoApp";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Time from "./components/Timer";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/time" exact component={Time} />
        <Route path="/todo" exact component={TodoApp} />
      </div>
    </BrowserRouter>
  );
}

export default App;
