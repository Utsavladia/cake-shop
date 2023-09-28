import React from "react";
import "./styles.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Cakes from "./Pages/Cakes";
import Nav from "./components/Nav";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import Login from "./Pages/Profile/Login";
import Register from "./Pages/Profile/Register";
import Reset from "./Pages/Profile/Reset";
import Dashboard from "./Pages/Profile/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./Pages/Admin";

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
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset" component={Reset} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    </Router>
  );
}
