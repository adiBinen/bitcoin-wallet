import React, { Component } from 'react';
import { HashRouter, Route, Switch }  from 'react-router-dom';

import HomePage from './pages/HomePage'
import StatisticPage from './pages/StatisticPage'
import ContactPage from './pages/ContactPage'
import ContactDetails from './pages/ContactDetails'
import ContactEditPage from './pages/ContactEditPage'
import Header from './components/Header'

import './App.css'

class App extends Component {
  
  render() {
    return (
      <div className="app">
        <Header></Header>
        <HashRouter>
          
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/contact" component={ContactPage} />
            <Route path="/contact/edit/:id?" component={ContactEditPage} />
            <Route path="/contact/:id" component={ContactDetails} />
            <Route path="/statistic" component={StatisticPage} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
