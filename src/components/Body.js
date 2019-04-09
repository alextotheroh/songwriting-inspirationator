import React, { Component } from 'react';
import SongAttribute from './SongAttribute';
import GeneratedTemplate from './GeneratedTemplate';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import CachedIcon from '@material-ui/icons/Cached';
import * as services from '../services/Services';

class Body extends Component {

  constructor(props) {
    super(props);

    this.state = {
      instruments: [],
      attributes: [],
      possibilities: 0,
      generatedTemplate: null
    }
  }

  componentWillMount(props) {
    // todo determine if custom state in local storage, init from there if so
    services.initFromDefaults();
    this.setState({
      instruments: services.getInstruments(),
      attributes: services.getSongAttributes(),
      possibilities: services.getTotalNumberOfPossibilities()
    });
  }

  render() {

    var chunkedAttributes = chunkArray(this.state.attributes, this.state.attributes.length/3);

    return (
      <div>
        <div className="Body-songAttributeContainer">
          <Grid container spacing={8}>
            <Grid item xs={4}>
              {chunkedAttributes[0].map((attribute) => 
                <SongAttribute attribute={attribute} instruments={this.state.instruments} key={attribute.name}/>
              )}
            </Grid>

            <Grid item xs={4}>
              {chunkedAttributes[1].map((attribute) => 
                <SongAttribute attribute={attribute} instruments={this.state.instruments} key={attribute.name}/>
              )}
            </Grid>

            <Grid item xs={4}>
              {chunkedAttributes[2].map((attribute) => 
                <SongAttribute attribute={attribute} instruments={this.state.instruments} key={attribute.name}/>
              )}
            </Grid>

          </Grid>
        </div>

        <div className="Body-buttonsContainer">
          <div className="Body-possibilitiesButtonContainer">
            <span className="Body-possibilitiesTag">Total possibilities: </span>
            <span className="Body-possibilitiesNumber">{this.state.possibilities.toLocaleString()}</span>
            <Button variant="contained" color="primary" size="small" onClick={this.handleCalculatePossibilitiesClick}>
              Recalculate&nbsp;
              <CachedIcon />
            </Button>
          </div>
          <Button variant="contained" color="primary" size="large" onClick={this.handleGenerateClick}>
            Generate Template&nbsp;&nbsp;&nbsp;
            <LaunchOutlinedIcon />
          </Button>
        </div>

        <div>
          {this.state.generatedTemplate ? <GeneratedTemplate template={this.state.generatedTemplate} /> : ""}
        </div>

      </div>
    );
  }

  handleGenerateClick = e => {
    this.setState({
      generatedTemplate: services.generateTemplate()
    });
  }

  handleCalculatePossibilitiesClick = e => {
    this.setState({
      possibilities: services.getTotalNumberOfPossibilities()
    });
  }
}

function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunk_size) {
      var myChunk = myArray.slice(index, index+chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
  }

  return tempArray;
}

export default Body;
