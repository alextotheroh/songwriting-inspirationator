import React, { Component } from 'react';
import * as services from '../services/Services';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class InstrumentsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      instruments: services.getInstruments(),
      anchorEl: null,
      instrumentToDelete: null
    }
  }

  render() {

    var instruments = <div>
      {this.state.instruments.map(instrument => {
        return <div className="InstrumentsList-item" key={instrument.name} onContextMenu={this.handleInstrumentRightClick(instrument.name)}>
          - {instrument.name}
        </div>;
      })}
    </div>;

    var addInstrumentButton = <Button color="secondary" 
      size="large" onClick={this.handleAddInstrumentClick} className="InstrumentList-addInstrumentButton">
      Add instrument...
    </Button>;

    return (
      <div className="InstrumentsList-container">
        <ExpansionPanel className="InstrumentsList-expansionPanel">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <span className="InstrumentsList-title">Available Instruments</span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {instruments}
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            {addInstrumentButton}
          </ExpansionPanelActions>
        </ExpansionPanel>

        <Menu
          id="instContextMenu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleInstrumentRightClickClose}>
          <MenuItem onClick={this.handleDeleteClick}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  }

  handleAddInstrumentClick = event => {
    // todo, pop modal?  enter instrument name and type, can submit or cancel
  }

  handleInstrumentRightClick = instrumentName => event => {
    event.preventDefault();
    this.setState({
      anchorEl: event.currentTarget,
      instrumentToDelete: instrumentName
    });
    
  }

  handleInstrumentRightClickClose = () => {
    this.setState({ anchorEl: null });
  }

  handleDeleteClick = () => {
    console.log("deleting: " + this.state.instrumentToDelete);
    this.setState({
      anchorEl: null,
      instrumentToDelete: null
    });
  }
}

export default InstrumentsList;
