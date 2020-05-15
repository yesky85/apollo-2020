import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Route path="/" exact component={Home} />
      <Route path="/:id" component={Detail} />
    </Router>
  );
}

export default App;
