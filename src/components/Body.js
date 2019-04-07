import React, { Component } from 'react';
import * as services from '../services/Services';

class Body extends Component {

  constructor(props) {
    super(props);

    this.state = {
      instruments: [],
      attributes: {}
    }
  }

  componentWillMount(props) {
    // todo determine if custom state in local storage, initi from thee if so
    services.initFromDefaults();
    this.setState({
      instruments: services.getInstruments(),
      attributes: services.getSongAttributes()
    });
  }

  render() {



    return (
      <div>
        <div>{JSON.stringify(this.state.instruments)}</div><br /><br /><br /><br /><br />
        <div>{JSON.stringify(this.state.attributes)}</div>
      </div>
    );
  }
}

export default Body;
