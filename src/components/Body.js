import React, { Component } from 'react';
import SongAttribute from './SongAttribute';
import Button from '@material-ui/core/Button';
import * as services from '../services/Services';

class Body extends Component {

  constructor(props) {
    super(props);

    this.state = {
      instruments: [],
      attributes: [],
      generatedTemplate: null
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
        <div className="Body-songAttributeContainer">
          {this.state.attributes.map((attribute) => 
            <SongAttribute attribute={attribute} instruments={this.state.instruments} key={attribute.name}/>
          )}
        </div>

        <div className="Body-generateButtonContainer">
          <Button variant="contained" color="primary" size="large" onClick={this.handleGenerateClick}>
            Generate Template
          </Button>
        </div>

        <div>
          {this.state.generatedTemplate ? this.state.generatedTemplate.instruments.map(instrument => {
            return <div>{JSON.stringify(instrument)}</div>
          }) : ""}
        </div><br/><br/>

        <div>
          {this.state.generatedTemplate ? this.state.generatedTemplate.attributes.map(attribute => {
            return <div>{JSON.stringify(attribute)}</div>
          }) : ""}
        </div>

      </div>
    );
  }

  handleGenerateClick = e => {
    this.setState({
      generatedTemplate: services.generateTemplate()
    });
  }
}

export default Body;
