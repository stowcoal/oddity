import React from 'react';
import ListGames from './ListGames.js';
import Home from './Home.js';
import CompareGames from './CompareGames.js';

import { Switch, Route } from 'react-router-dom';

const Main = function() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/games/week/:week' component={ListGames}/>
        <Route path='/games' component={ListGames}/>
        <Route path='/compare' component={CompareGames}/>
      </Switch>
    </main>
  )
}

export default Main;
