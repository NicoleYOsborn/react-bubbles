import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage'

import Login from "./components/Login";
import "./styles.scss";
import ColorList from "./components/ColorList";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Switch>
        <PrivateRoute exact path="/protected" component={BubblePage} />
        <PrivateRoute exact path="/protected" component={ColorList} />
        </Switch>
        {/* <Switch>
          
          
          
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch> */}
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
