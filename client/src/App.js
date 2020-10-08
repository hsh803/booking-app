import React, { Component } from 'react';
import {Route, BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
import { Book } from './components/Book';
import { Confirm } from './components/Confirm';
import { Cancel } from './components/Cancel';

class App extends Component {

  render() {
  return (
    <div>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Route exact path="/" component={Home} />
      <Route path="/book" component={Book} />
      <Route path="/book/confirm" component={Confirm} />
      <Route path="/cancel" component={Cancel} />
    </BrowserRouter>
    </div>
  );
}
}
export default App;
