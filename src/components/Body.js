import React, { Component } from 'react';
import SongAttribute from './SongAttribute';
import * as services from '../services/Services';

class Body extends Component {

  constructor(props) {
    super(props);

    this.state = {
      instruments: [],
      attributes: []
    }
  }

  componentWillMount(props) {
    // todo determine if custom state in local storage, init from there if so
    services.initFromDefaults();
    this.setState({
      instruments: services.getInstruments(),
      attributes: services.getSongAttributes()
    });
  }

  render() {

    return (
      <div>
        {this.state.attributes.map((attribute) => 
          <SongAttribute attribute={attribute} instruments={this.state.instruments} key={attribute.name}/>
        )}
      </div>
    );
  }
}

export default Body;
