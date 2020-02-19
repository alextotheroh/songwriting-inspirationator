import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import * as services from '../backend/services/Services';

class AddAttributeDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributeName: '',
      attributeType: ''
    };
  }
  render() {
    return (
      <Dialog
      open={this.props.open}
      onClose={this.handleClose}>
      <DialogTitle>Add New Song Attribute</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          onChange={this.handleAttributeNameChange}
          value={this.state.attributeName}
          margin="dense"
          id="attribute-name"
          label="Attribute Name"
          type="text"
          fullWidth
        /><br /><br />
        <InputLabel htmlFor="attribute-type">Attribute Type</InputLabel>&nbsp;&nbsp;
          <Select
            style={{minWidth: 160}}
            value={this.state.attributeType}
            onChange={this.handleAttributeTypeSelectorChange}
            input={<Input id="attribute-type" />}>
            <MenuItem value="list-of-values">List of values</MenuItem>
            <MenuItem value="selects-from-instruments">Selects from instruments</MenuItem>
          </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    );
  }

  handleClose = e => {
    this.setState({
      attributeName: '',
      attributeType: ''
    });
    this.props.onClose();
  }

  handleSubmit = e => {
    if (this.state.attributeType === "selects-from-instruments") {
      services.addNewSelectsFromInstrumentsAttribute(this.state.attributeName);
    } else if (this.state.attributeType === "list-of-values") {
      services.addNewListOfValuesAttribute(this.state.attributeName);
    } else {
      console.error("unsupported attributeType found in AddAttributeDialog.js");
    }
    this.props.onStateUpdated();
    this.handleClose();
  }

  handleAttributeTypeSelectorChange = e => {
    this.setState({
      ...this.state, 
      attributeType: e.target.value
    });
  }

  handleAttributeNameChange = e => {
    this.setState({
      attributeName: e.target.value
    });
  }
}

AddAttributeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onStateUpdated: PropTypes.func.isRequired
};

export default AddAttributeDialog;