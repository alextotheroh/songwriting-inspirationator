import React, { Component } from 'react';

class SongAttribute extends Component {
  render() {

    var instruments = this.props.instruments;

    return (
      <div>
        {JSON.stringify(instruments)}
      </div>
    );
  }
}

export default SongAttribute;
