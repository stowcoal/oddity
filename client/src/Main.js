import React from 'react';
import ListWeekGames from './pages/ListWeekGames.js';
import ListGames from './pages/ListGames.js';
import Home from './pages/Home.js';
import Compare from './pages/Compare.js';
import Results from './pages/Results.js';
import Game from './pages/Game.js';
import NotFound from './pages/NotFound.js';

import { Switch, Route } from 'react-router-dom';

const Main = function() {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/week/:week' component={ListWeekGames}/>
      <Route path='/week' component={ListWeekGames}/>
      <Route path='/games' component={ListGames}/>
      <Route path='/game/:gameId' component={Game}/>
      <Route path='/compare' component={Compare}/>
      <Route path='/results' component={Results}/>
      <Route component={NotFound}/>
    </Switch>
  )
}

export default Main;
