import React from 'react';
import ListGames from './ListGames.js';
import Home from './Home.js';
import CompareGames from './CompareGames.js';
import Results from './Results.js';
import Game from './Game.js';

import { Switch, Route } from 'react-router-dom';

const Main = function() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/games/week/:week' component={ListGames}/>
        <Route path='/game/:gameId' component={Game}/>
        <Route path='/games' component={ListGames}/>
        <Route path='/compare' component={CompareGames}/>
        <Route path='/results' component={Results}/>
      </Switch>
    </main>
  )
}

export default Main;
