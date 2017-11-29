import React, {Component} from 'react';
import moment from 'moment-timezone';

class GameFilter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.gameFilter = this.gameFilter.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({[name]: value}, () => {
      this.props.update(this.props.games.filter(this.gameFilter));
    });
  }

  gameFilter(game) {
    var spread = game.lines[game.lines.length-1].spread;
    var diff = game.score && (game.score.away - game.score.home);
    return (!this.state.team || game.home.includes(this.state.team) || game.away.includes(this.state.team)) &&
          (!this.state.spread || spread === Number(this.state.spread)) &&
          (!this.state.scoreDifference || (diff === Number(this.state.scoreDifference))) &&
          (!this.state.season || (moment(game.start).isBetween('02/01/' + this.state.season, '02/01/' + (Number(this.state.season) + 1))));
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <a data-toggle="collapse" href="#filter-control">Filter</a>
        </div>
        <div id="filter-control" className='collapse'>
          <div className="card-body">
            <form className="form-row align-items-center">
              <div className="col">
                <label>Team</label>
                <input className="form-control" value={this.props.home} name="team" type="text" onChange={this.handleChange} />
              </div>
              <div className="col">
                <label>Spread</label>
                <input className="form-control" value={this.props.spread} name="spread" type="number" onChange={this.handleChange} />
              </div>
              <div className="col">
                <label>Score</label>
                <input className="form-control" value={this.props.scoreDifference} name="scoreDifference" type="number" onChange={this.handleChange} />
              </div>
              <div className="col">
                <label>Season</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>Select a Year</option>
                  <option>2017</option>
                  <option>2016</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default GameFilter;
