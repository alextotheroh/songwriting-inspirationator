import React, { Component } from 'react';
import InstrumentsList from './InstrumentsList';
import SongAttribute from './SongAttribute';
import GeneratedTemplate from './GeneratedTemplate';
import AddAttributeDialog from './AddAttributeDialog';
import ExportConfigDialog from './ExportConfigDialog';
import ImportConfigDialog from './ImportConfigDialog';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import * as services from '../services/Services';

class SongwritingInspirationator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
      instruments: [],
      possibilities: 0,
      generatedTemplate: null,
      anchorEl: null,
      showAddAttributeDialog: false,
      showExportConfigDialog: false,
      showImportConfigDialog: false,
      exportHref: ''
    }
  }

  componentWillMount(props) {
    services.init();
    this.setState({
      attributes: services.getSongAttributes(),
      instruments: services.getInstruments(),
      possibilities: services.getTotalNumberOfPossibilities(),
      exportHref: "data:application/octet-stream;charset=utf-8;base64," + services.getBase64EncodedState()
    });
  }

  render() {

    var chunkedAttributes = chunkArray(this.state.attributes, this.state.attributes.length/3);

    return (
      <div>
        <InstrumentsList instruments={this.state.instruments} onStateUpdated={this.stateUpdated}/>
        <div className="Body-songAttributeContainer">
          <div className="Body-SongAttributesSectionTitle" onContextMenu={this.handleSongAttributesRightClick}>
            Song Attributes
          </div>
          <Grid container spacing={8}>
            <Grid item xs={4}>
              {chunkedAttributes[0].map((attribute) => 
                <SongAttribute attribute={attribute} key={attribute.name} 
                  onStateUpdated={this.stateUpdated}/>
              )}
            </Grid>

            <Grid item xs={4}>
              {chunkedAttributes[1].map((attribute) => 
                <SongAttribute attribute={attribute} key={attribute.name}
                  onStateUpdated={this.stateUpdated}/>
              )}
            </Grid>

            <Grid item xs={4}>
              {chunkedAttributes[2].map((attribute) => 
                <SongAttribute attribute={attribute} key={attribute.name}
                  onStateUpdated={this.stateUpdated}/>
              )}
            </Grid>

          </Grid>
        </div>

        <div className="Body-buttonsContainer">
          <br/>
          <Button variant="contained" color="secondary" size="small" onClick={this.handleExportClick}>
            <span className="Body-white">Export Configuration</span>&nbsp;&nbsp;
            <ArchiveOutlinedIcon style={{color: "f0f0f0"}} />
          </Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="secondary" size="small" onClick={this.handleImportClick}>
            <span className="Body-white">Import Configuration</span>&nbsp;&nbsp;
            <UnarchiveOutlinedIcon style={{color: "f0f0f0"}} />
          </Button><br/><br/><br/>
          <Button variant="contained" color="primary" size="large" onClick={this.handleGenerateClick}>
            <span>Generate Template</span>&nbsp;&nbsp;&nbsp;
            <LaunchOutlinedIcon />
          </Button>
          <div className="Body-possibilitiesContainer">
            <span className="Body-possibilitiesTag">Total possibilities: </span>
            <span className="Body-possibilitiesNumber">{this.state.possibilities.toLocaleString()}</span>
          </div>
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
        <AddAttributeDialog open={this.state.showAddAttributeDialog} onClose={this.handleAddAttributeDialogClose} onStateUpdated={this.stateUpdated}/>
        <ExportConfigDialog open={this.state.showExportConfigDialog} onClose={this.handleExportDialogClose} exportHref={this.state.exportHref} />
        <ImportConfigDialog open={this.state.showImportConfigDialog} onClose={this.handleImportDialogClose} importedConfigCallback={this.handleConfigImported}/>       
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

  handleExportClick = e => {
    this.setState({
      showExportConfigDialog: true
    });
  }

  handleExportDialogClose = () => {
    this.setState({
      showExportConfigDialog: false
    });
  }

  handleImportClick = e => {
    this.setState({
      showImportConfigDialog: true
    });
  }

  handleImportDialogClose = () => {
    this.setState({
      showImportConfigDialog: false
    });
  }

  stateUpdated = () => {
    this.setState({
      attributes: services.getSongAttributes(),
      instruments: services.getInstruments(),
      exportHref: "data:application/octet-stream;charset=utf-8;base64," + services.getBase64EncodedState(),
      possibilities: services.getTotalNumberOfPossibilities()
    });
  }

  // needed because controlling mins/maxes inside of expansion panels 
  // from props that change over time is stupid complex.  Refreshing on import is ezpz.
  handleConfigImported = () => {
    window.location.reload();
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

export default SongwritingInspirationator;
