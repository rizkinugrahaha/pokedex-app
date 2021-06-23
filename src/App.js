import React from 'react';
import { Route } from 'react-router-dom';
import Home from './page/Home';
import Details from './page/Details';
import Header from './components/Header';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/details">
        <Details />
      </Route>
    </React.Fragment>
  );
}

export default App;
