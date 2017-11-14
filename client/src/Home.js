import React from 'react';

const Home = function() {
  return (
    <div className="container my-2">
      <div className="jumbotron">
        <h1 className="display-3">Oddity</h1>
        <p className="lead">A fresh approach to spread betting analysis</p>
      </div>
      <div className="row">
        <div className="col-md">
          <h1>Feature 1</h1>
          <p>It's awesome</p>
        </div>
        <div className="col-md">
          <h1>Feature 2</h1>
          <p>It's fast</p>
        </div>
        <div className="col-md">
          <h1>Feature 3</h1>
          <p>It's free</p>
        </div>
      </div>
    </div>
  )
}

export default Home;
