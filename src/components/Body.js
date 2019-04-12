import React, { Component } from 'react';
import InstrumentsList from './InstrumentsList';
import SongAttribute from './SongAttribute';
import GeneratedTemplate from './GeneratedTemplate';
import AddAttributeDialog from './AddAttributeDialog';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import CachedIcon from '@material-ui/icons/Cached';
import * as services from '../services/Services';

class Body extends Component {

  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
      possibilities: 0,
      generatedTemplate: null,
      anchorEl: null,
      showAddAttributeDialog: false
    }
  }

  componentWillMount(props) {
    services.init();
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
          <div className="Body-SongAttributesSectionTitle" onContextMenu={this.handleSongAttributesRightClick}>
            Song Attributes
          </div>
          <Grid container spacing={8}>
            <Grid item xs={4}>
              {chunkedAttributes[0].map((attribute) => 
                <SongAttribute attribute={attribute} key={attribute.name} attributeDeletedCallback={this.handleAttributeDeleted} />
              )}
            </Grid>

            <Grid item xs={4}>
              {chunkedAttributes[1].map((attribute) => 
                <SongAttribute attribute={attribute} key={attribute.name} attributeDeletedCallback={this.handleAttributeDeleted} />
              )}
            </Grid>

            <Grid item xs={4}>
              {chunkedAttributes[2].map((attribute) => 
                <SongAttribute attribute={attribute} key={attribute.name} attributeDeletedCallback={this.handleAttributeDeleted} />
              )}
            </Grid>

          </Grid>
        </div>

        <div className="Body-buttonsContainer">
          <div className="Body-possibilitiesButtonContainer">
            <span className="Body-possibilitiesTag">Total possibilities: </span>
            <span className="Body-possibilitiesNumber">{this.state.possibilities.toLocaleString()}</span>
            <Button variant="contained" color="primary" size="small" onClick={this.handleCalculatePossibilitiesClick}>
              <span className="Body-japaneseIndigo">Recalculate&nbsp;</span>
              <CachedIcon />
            </Button>
          </div>
          <Button variant="contained" color="primary" size="large" onClick={this.handleGenerateClick}>
            <span className="Body-japaneseIndigo">Generate Template</span>&nbsp;&nbsp;&nbsp;
            <LaunchOutlinedIcon />
          </Button>
        </div>

        <div>
          {this.state.generatedTemplate ? <GeneratedTemplate template={this.state.generatedTemplate} /> : ""}
        </div>

        <Menu
          id="attributesContextMenu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleAttributesRightClickClose}>
          <MenuItem onClick={this.handleAddAttributeClick}>
            Add new attribute...
          </MenuItem>
        </Menu>
        <AddAttributeDialog open={this.state.showAddAttributeDialog} onClose={this.handleAddAttributeDialogClose}/>

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

  handleSongAttributesRightClick = e => {
    e.preventDefault();
    this.setState({
      anchorEl: e.currentTarget
    });
  }

  handleAttributesRightClickClose = e => {
    this.setState({
      anchorEl: null
    });
  }

  handleAddAttributeClick = e => {
    this.setState({
      showAddAttributeDialog: true,
      anchorEl: null
    });
  }

  handleAddAttributeDialogClose = () => {
    this.setState({ showAddAttributeDialog: false });
  }

  handleAttributeDeleted = () => {
    this.setState({
      attributes: services.getSongAttributes(),
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
