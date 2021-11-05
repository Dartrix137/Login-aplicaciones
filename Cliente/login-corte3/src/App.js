import React from "react";
import Login from "./Login/Login"
import Home from "./Home/Home";
import { BrowserRouter as Router, Switch, Route, 
  Link} from 'react-router-dom';
function App() {
  return (
    <Router>
      
      <Switch>
        <Route path="/home" exact>
          <Home /> 
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
      
    </Router>
  );
}

export default App;
