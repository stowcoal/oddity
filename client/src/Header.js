import React from 'react';
import {withRouter} from 'react-router-dom';

const Header = function(props) {
  return (
    <nav className="navbar navbar-dark navbar-expand bg-dark">
      <a className="navbar-brand" href="/">Oddity</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className={"nav-item " + (props.location.pathname === '/' && 'active')}>
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className={"nav-item " + (props.location.pathname.includes('week') && 'active') }>
            <a className="nav-link" href="/week">Weeks</a>
          </li>
          <li className={"nav-item " + (props.location.pathname.includes('games') && 'active') }>
            <a className="nav-link" href="/games">Games</a>
          </li>
          <li className={"nav-item " + (props.location.pathname.includes('compare') && 'active')}>
            <a className="nav-link" href="/compare">Compare</a>
          </li>
          <li className={"nav-item " + (props.location.pathname.includes('results')&& 'active')}>
            <a className="nav-link" href="/results">Results</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Header);
