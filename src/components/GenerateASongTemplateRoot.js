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
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as services from '../services/Services';

class GenerateASongTemplateRoot extends Component {

  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
      instruments: [],
      possibilities: 0,
      generatedTemplate: null,
      anchorEl: null,
      showAddAttributeDialog: false
    }
  }

  componentWillMount(props) {
    this.setState({
      attributes: services.getSongAttributes(),
      instruments: services.getInstruments(),
      possibilities: services.getTotalNumberOfPossibilities()
    });
  }

  render() {

    var chunkedAttributes = chunkArray(this.state.attributes, this.state.attributes.length/3);

    var dialogOpenedByHelpButton = (
      <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}>
          <div style={{width: 1000}} />
          <DialogTitle>Help</DialogTitle>
          <DialogContent>
            <strong>What is this?</strong>
            <p>This tool allows you to configure some options for a song based on your instruments, tastes, etc., then randomly generate a song template that draws from those options.</p>
            <p>The customizations you make will be saved to your local browser, but will be lost if you clear your browser cache or move to a different machine.
              The "Export Configuration" button allows you to save your customizations to a file, which you can then import later.</p><br/>
            <strong>What can I do?</strong><br/>
            <p>- Enable or disable an instrument by clicking the checkbox next to it.  Disabled instruments won't ever be selected for the template.</p>
            <p>- Enable or disable an atribute by clicking the slider button on the attribute card.  Disabled attributes won't appear in the generated template.</p>
            <p>- Enable or disable a specific value in an attribute by clicking the checkbox next to it.</p>
            <p>- Some attributes use min/max values.  These are editable.  When the template is generated, a random number between these values is chosen (inclusive).</p>
            <p>- Add a new instrument by clicking the "Add Instrument" button in the expanded instruments panel.</p>
            <p>- Delete an instrument by right clicking it and selecting "delete."</p>
            <p>- Delete an entire attribute by right clicking the attribute panel and selecting "delete entire attribute."</p>
            <p>- Delete a value inside an attribute by right clicking the value and selecting "delete."</p>
            <p>- Add a whole new attribute by right clicking the "Song Attributes" heading, then clicking "Add new attribute..."</p>
            <p>- Print the generated template by clicking the print button.</p>
            
          </DialogContent>
        </Dialog>
    );

    return (
      <div className="theme-content-container">
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
          <br/><br/>
          <IconButton onClick={this.handleHelpClick}>
                <HelpOutlineIcon color='primary'/>
              </IconButton>
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

        {dialogOpenedByHelpButton}   
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

  handleHelpClick = e => {
    this.setState( {dialogOpen: true} );
  }

  handleDialogClose = e => {
    this.setState( {dialogOpen: false} );
  }

  stateUpdated = () => {
    this.setState({
      attributes: services.getSongAttributes(),
      instruments: services.getInstruments(),
      exportHref: "data:application/octet-stream;charset=utf-8;base64," + services.getBase64EncodedState(),
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

export default GenerateASongTemplateRoot;
