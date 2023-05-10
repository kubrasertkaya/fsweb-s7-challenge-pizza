import React from "react";
import Header from "./components/Header";
import Page from "./components/PageSuccess";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
const App = () => {
  return (
   
<Switch>
     <Route exact path='/'><Home /></Route>
      <Route path='/success'><Page /></Route>
      <Route path='/order'><Header /></Route>
      </Switch>
       
  );
};
export default App;
