import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as services from '../backend/services/Services';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

class InstrumentsList extends Component {

  constructor(props) {
    super(props);

    var initialState = {
      anchorEl: null,
      instrumentToDelete: null,
      addInstrumentDialogOpen: false,
      instrumentToAddType: "",
      instrumentToAddName: ""
    }
    this.props.instruments.forEach(instrument => {
      initialState[instrument.name+"Checked"] = instrument.enabled
    })

    this.state=(initialState);
  }

  render() {

    var instruments = <div>
      {this.props.instruments.map(instrument => {
        return <div className="InstrumentsList-item" key={instrument.name} onContextMenu={this.handleInstrumentRightClick(instrument.name)}>
          - {instrument.name}
          <Checkbox onChange={this.handleCheckboxChangeForInstrument(instrument.name)} checked={this.state[instrument.name+"Checked"]}/>
        </div>;
      })}
    </div>;

    var addInstrumentButton = <Button color="secondary" 
      size="large" onClick={this.handleAddInstrumentClick} className="InstrumentList-addInstrumentButton">
      Add instrument...
    </Button>;

    var newInstrumentDialog = <Dialog
      open={this.state.addInstrumentDialogOpen}
      onClose={this.handleAddInstrumentDialogClose}>
      <DialogTitle>Add Instrument</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter instrument name and select instrument type
        </DialogContentText>
        <TextField
          autoFocus
          onChange={this.handleInstrumentToAddNameChange}
          value={this.state.instrumentToAddName}
          margin="dense"
          id="name"
          label="Instrument Name"
          type="text"
          fullWidth
        />
        <form>
          <FormControl>
            <InputLabel htmlFor="instrument-type">Instrument Type</InputLabel>
            <Select
              style={{minWidth: 160}}
              value={this.state.instrumentToAddType}
              onChange={this.handleInstrumentTypeSelectorChange}
              input={<Input id="instrument-type" />}>
              <MenuItem value="guitar">guitar</MenuItem>
              <MenuItem value="bass">bass</MenuItem>
              <MenuItem value="keys">keys</MenuItem>
              <MenuItem value="drums">drums</MenuItem>
              <MenuItem value="ambient">ambient</MenuItem>
            </Select>
          </FormControl>  
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleAddInstrumentDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleAddInstrumentSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>

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

        {newInstrumentDialog}
      </div>
    );
  }

  handleAddInstrumentClick = event => {
    this.setState({
      addInstrumentDialogOpen: true
    });
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

  handleCheckboxChangeForInstrument = instName => e => {
    services.setInstrumentEnabledByName(instName, e.target.checked);
    var newSubstate = {};
    newSubstate[instName+"Checked"] = e.target.checked;

    this.setState(newSubstate);
    this.props.onStateUpdated();
  }

  handleDeleteClick = () => {
    services.deleteInstrumentByName(this.state.instrumentToDelete);
    this.setState({
      anchorEl: null,
      instrumentToDelete: null
    });
    this.props.onStateUpdated();
  }

  handleAddInstrumentDialogClose = () => {
    this.setState({
      addInstrumentDialogOpen: false,
      instrumentToAddName: '',
      instrumentToAddType: ''
    });
  }

  handleInstrumentTypeSelectorChange = (event) => {
    this.setState({
      ...this.state, 
      instrumentToAddType: event.target.value
    });
  }

  handleInstrumentToAddNameChange = (event) => {
    this.setState({
      instrumentToAddName: event.target.value
    });
  }

  handleAddInstrumentSubmit = () => {
    services.addNewInstrument(this.state.instrumentToAddName, this.state.instrumentToAddType);
    var newSubstate = {
      instruments: services.getInstruments(),
      addInstrumentDialogOpen: false,
      instrumentToAddName: '',
      instrumentToAddType: ''
    };
    newSubstate[this.state.instrumentToAddName+"Checked"] = true;
    this.setState(newSubstate);
    this.props.onStateUpdated();
  }
}

InstrumentsList.propTypes = {
  onStateUpdated: PropTypes.func.isRequired,
  instruments: PropTypes.array.isRequired
}

export default InstrumentsList;
