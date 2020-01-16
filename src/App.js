import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Notes from './components/user/Notes';
import MenuBar from './components/admin/MenuBar';
import NotFound from './components/utilities/NotFound';

const App = () => (  
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Notes} />
      <Route path='/admin' component={MenuBar} />
      <Route path="*" component={ NotFound } />
    </Switch>
  </BrowserRouter>
);

export default App;