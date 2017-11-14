import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Home from './pages/Home';
import Compare from './pages/Compare';
import Game from './pages/Game';
import ListGames from './pages/ListGames';
import ListWeekGames from './pages/ListWeekGames';
import Results from './pages/Results';
import NotFound from './pages/NotFound';
import Main from './Main';

test('invalid path should redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <Main />
    </MemoryRouter>
  );
  expect(wrapper.find(Home)).toHaveLength(0);
  expect(wrapper.find(NotFound)).toHaveLength(1);
});

test('invalid path should return home', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <Main />
    </MemoryRouter>
  );
  expect(wrapper.find(Home)).toHaveLength(1);
  expect(wrapper.find(NotFound)).toHaveLength(0);
});

test('invalid path should return home', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/week' ]}>
      <Main />
    </MemoryRouter>
  );
  expect(wrapper.find(ListWeekGames)).toHaveLength(1);
  expect(wrapper.find(NotFound)).toHaveLength(0);
});

test('invalid path should return home', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/games' ]}>
      <Main />
    </MemoryRouter>
  );
  expect(wrapper.find(ListGames)).toHaveLength(1);
  expect(wrapper.find(NotFound)).toHaveLength(0);
});

test('invalid path should return home', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/compare' ]}>
      <Main />
    </MemoryRouter>
  );
  expect(wrapper.find(Compare)).toHaveLength(1);
  expect(wrapper.find(NotFound)).toHaveLength(0);
});


test('invalid path should return home', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/results' ]}>
      <Main />
    </MemoryRouter>
  );
  expect(wrapper.find(Results)).toHaveLength(1);
  expect(wrapper.find(NotFound)).toHaveLength(0);
});
