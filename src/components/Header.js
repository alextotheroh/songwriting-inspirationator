import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

class Header extends Component {
  render() {
    return (
      <div>
        <div className="Header-container">
          <div className="Header-title">
            Songwriting Inspirationator
          </div>
          <div className="Header-helpIconContainer">
            <IconButton >
              <HelpOutlineIcon color='primary'/>
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
