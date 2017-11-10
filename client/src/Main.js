import React from 'react';
import ListWeekGames from './ListWeekGames.js';
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
        <Route path='/week/:week' component={ListWeekGames}/>
        <Route path='/week' component={ListWeekGames}/>
        <Route path='/games' component={ListGames}/>
        <Route path='/game/:gameId' component={Game}/>
        <Route path='/compare' component={CompareGames}/>
        <Route path='/results' component={Results}/>
      </Switch>
    </main>
  )
}

export default Main;
