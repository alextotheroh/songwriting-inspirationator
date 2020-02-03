import React, { Component } from 'react';
import Nav from './Nav.js';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false
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

          <Nav />

        </div>
        
      </div>
    );
  }
}

export default Header;
