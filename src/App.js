import React from "react";
import "./styles.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Cakes from "./Pages/Cakes";
import Nav from "./components/Nav";
import Products from "./Pages/Products";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/cakes" component={Cakes} />
          <Route path="/products" component={Products} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}
