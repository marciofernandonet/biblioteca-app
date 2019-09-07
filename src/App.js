import React from "react";
import { HashRouter  as Router, Switch, Route } from 'react-router-dom';
import MenuAdmin from './components/book.menu';
import BookNote from './components/book.note';
import NotFound from './components/utilities/notFound';

const App = () => (  
  <Router>
    <Switch>
      <Route path='/admin' component={ MenuAdmin } />
      <Route exact path='/' component={ BookNote } />
      <Route path="*" component={ NotFound } />
    </Switch>
  </Router>
);

export default App;