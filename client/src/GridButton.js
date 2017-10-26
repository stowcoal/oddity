import React, {Component} from 'react';

class GridButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onClick({columns: this.props.columns});
  }

  render() {
    return (
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={this.onClick}>{this.props.columns}</a>
      </li>
    )
  }
}

export default GridButton;
