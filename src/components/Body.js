import React, { Component } from 'react';
import InstrumentsList from './InstrumentsList';
import SongAttribute from './SongAttribute';
import GeneratedTemplate from './GeneratedTemplate';
import Grid from '@material-ui/core/Grid';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import CachedIcon from '@material-ui/icons/Cached';
import * as services from '../services/Services';

class Body extends Component {

  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
      possibilities: 0,
      generatedTemplate: null
    }
  }

  componentWillMount(props) {
    // todo determine if custom state in local storage, init from there if so
    services.initFromDefaults();
    this.setState({
      attributes: services.getSongAttributes(),
      possibilities: services.getTotalNumberOfPossibilities()
    });
  }

  render() {

    var chunkedAttributes = chunkArray(this.state.attributes, this.state.attributes.length/3);

    return (
      <div>
        <InstrumentsList />
        <div className="Body-songAttributeContainer">
          <div className="Body-SongAttributesSectionTitle">Song Attributes</div>
          <Grid container spacing={8}>
            <Grid item xs={4}>
              {chunkedAttributes[0].map((attribute) => 
                <SongAttribute attribute={attribute} key={attribute.name}/>
              )}
            </Grid>

            <Grid item xs={4}>
              {chunkedAttributes[1].map((attribute) => 
                <SongAttribute attribute={attribute} key={attribute.name}/>
              )}
            </Grid>

            <Grid item xs={4}>
              {chunkedAttributes[2].map((attribute) => 
                <SongAttribute attribute={attribute} key={attribute.name}/>
              )}
            </Grid>

          </Grid>
        </div>

        <div className="Body-buttonsContainer">
          <div className="Body-possibilitiesButtonContainer">
            <span className="Body-possibilitiesTag">Total possibilities: </span>
            <span className="Body-possibilitiesNumber">{this.state.possibilities.toLocaleString()}</span>
            <div onClick={this.handleCalculatePossibilitiesClick}>
              Recalculate&nbsp;
              <CachedIcon />
            </div>
          </div>
          <div onClick={this.handleGenerateClick}>
            Generate Template&nbsp;&nbsp;&nbsp;
            <LaunchOutlinedIcon />
          </div>
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
