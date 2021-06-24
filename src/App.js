import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './page/Home';
import Details from './page/Details';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="pokemon__main-layout">
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/detail/:name">
            <Details />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
