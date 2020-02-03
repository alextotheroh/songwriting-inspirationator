import React, { Component } from 'react';
import Nav from './Nav.js';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      currentUrl: window.location.href
    }

    // hacky way to set the selected tab without redux and without rearchitecting stuff (I know, it's a personal project, OK?)
    setInterval(this.checkIfUrlNeedsUpdated, 150);
  }

  checkIfUrlNeedsUpdated = () => {
    if (this.state.currentUrl !== window.location.href) {
      this.setState({
        currentUrl: window.location.href
      });
    }
  }

  render() {

    return (
      <div className="Header-container">
        <div>
          <div className="Header-title-line-container">
            <div className="Header-title theme-color-1">
              Songwriting-Inspirationator
            </div>
          </div>

          <Nav currentUrl={this.state.currentUrl}/>

        </div>
        
      </div>
    );
  }
}

export default Header;
