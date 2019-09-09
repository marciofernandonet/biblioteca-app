import React from "react";
import { HashRouter  as Router, Switch, Route } from 'react-router-dom';
import Notes from './components/user/Notes';
import MenuBar from './components/admin/MenuBar';
import NotFound from './components/utilities/NotFound';

const App = () => (  
  <Router>
    <Switch>
      <Route path='/admin' component={ MenuBar } />
      <Route exact path='/' component={ Notes } />
      <Route path="*" component={ NotFound } />
    </Switch>
  </Router>
);

export default App;