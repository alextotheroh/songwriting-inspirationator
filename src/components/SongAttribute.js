import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as services from '../services/Services';

class SongAttribute extends Component {

  constructor(props) {
    super(props);

    var initialStateObj = {
      enabled: props.attribute.enabled
    };

    if (props.attribute.values) {
      props.attribute.values.forEach(v => {
        initialStateObj[v+"Checked"] = true; 
      })
    }

    if (props.attribute.min+1 && props.attribute.max) { // min+1 because 0 is falsy
      initialStateObj['min'] = props.attribute.min;
      initialStateObj['max'] = props.attribute.max;
    }

    if (props.attribute.min+1) {
      initialStateObj['min'] = props.attribute.min;
    }

    initialStateObj['showAddValueDialog'] = false;
    initialStateObj['valueToAdd'] = '';
    initialStateObj['valueAnchorEl'] = null;
    initialStateObj['attributeAnchorEl'] = null;
    initialStateObj['attributeToDeleteValueFrom'] = '';
    initialStateObj['valueToDelete'] = '';
    initialStateObj['attributeToDelete'] = '';

    this.state = initialStateObj;
  }

  render() {

    var attribute = this.props.attribute;

    var enabledSwitch =
      <FormControlLabel
          control={
            <Switch
              checked={this.state.enabled}
              onChange={this.handleEnabledSwitch(attribute.name)}
              onClick={e => e.stopPropagation()}
              value="enabled"
            />
          }
      />;

    var values = <div></div>;
    if ("selectsFromInstruments" in attribute && attribute.selectsFromInstruments) {
      values = <div>(selects from instruments)</div>;
    } else if ("values" in attribute) {
      values = <div>
        {attribute.values.map(value =>
          <div key={attribute+"-"+value} onContextMenu={this.handleValueRightClick(value)}>
            {"- " + value}
            <Checkbox onChange={this.handleCheckboxChangeForValuesAttr(attribute.name, value)} checked={this.state[value+"Checked"]}/>
          </div>
        )}
      </div>
    } else if ("min" in attribute && "max" in attribute) {
      values = <div>
        <span>min: </span><TextField type="number" value={this.state.min} onChange={this.handleMinChange(attribute.name)} /><br />
        <span>max: </span><TextField type="number" value={this.state.max} onChange={this.handleMaxChange(attribute.name)} />
      </div>
    } else if (attribute.name === "Minimum Instruments Count") {
      values = <div>
        <span>min: </span><TextField type="number" value={this.state.min} onChange={this.handleMinChange(attribute.name)} />
      </div>
    }

    var addValueDialog = <Dialog
      open={this.state.showAddValueDialog}
      onClose={this.handleAddValueDialogClose}>
      <DialogTitle>Add Value</DialogTitle>
      <DialogContent>
        <div style={{width: "500px"}} />
        <DialogContentText>
          Enter new value
        </DialogContentText>
        <TextField
          autoFocus
          onChange={this.handleValueToAddNameChange}
          value={this.state.valueToAdd}
          margin="dense"
          id="value"
          label="Value"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleAddValueDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleAddValueSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>

    return (
      <div className="SongAttribute-container" onContextMenu={this.handleAttributeRightClick}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <span className="SongAttribute-attrName">{attribute.name}</span>
            <span className="SongAttribute-switch">{enabledSwitch}</span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="SongAttribute-valuesContainer">
              {values}
            </div>
          </ExpansionPanelDetails>

          {"values" in attribute ? 
          <ExpansionPanelActions>
            <Button color="secondary" size="large" onClick={this.handleAddValueClick}>
              Add Value
            </Button>
          </ExpansionPanelActions> : ''}

        </ExpansionPanel>

        {addValueDialog}
        <Menu
          id="valueContextMenu"
          anchorEl={this.state.valueAnchorEl}
          open={Boolean(this.state.valueAnchorEl)}
          onClose={this.handleValueRightClickClose}>
          <MenuItem onClick={this.handleValueDeleteClick}>
            Delete
          </MenuItem>
        </Menu>

        <Menu
          id="attributeContextMenu"
          anchorEl={this.state.attributeAnchorEl}
          open={Boolean(this.state.attributeAnchorEl)}
          onClose={this.handleAttributeRightClickClose}>
          <MenuItem onClick={this.handleAttributeDeleteClick}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  }

  handleEnabledSwitch = attrName => event => {
    this.setState({
      enabled: event.target.checked
    });

    services.setAttributeEnabled(attrName, event.target.checked);
  }

  handleCheckboxChangeForValuesAttr = (attrName, value) => event => {
    services.enabledOrDisableValueForAttribute(attrName, value, event.target.checked);

    var newSubstate = {};
    newSubstate[value+"Checked"] = event.target.checked;
    this.setState(newSubstate);
  }

  handleMinChange = attr => event => {
    var positiveValue = event.target.value >= 0 ? event.target.value : 0;
    var alsoUpdateMax = false;
    if (parseInt(positiveValue) >= parseInt(this.state.max)) {
      alsoUpdateMax = true;
    }

    var newState = {};
    newState['min'] = positiveValue;
    if (alsoUpdateMax) {
      newState['max'] = positiveValue;
    }
    this.setState(newState);
    services.setMinForAttribute(attr, positiveValue);
    if (alsoUpdateMax) {
      services.setMaxForAttribute(attr, positiveValue);
    }
  }

  handleMaxChange = attr => event => {
    var positiveValue = event.target.value >= 0 ? event.target.value : 0;
    var alsoUpdateMin = false;
    if (parseInt(positiveValue) <= parseInt(this.state.min)) {
      alsoUpdateMin = true;
    }

    var newState = {};
    newState['max'] = positiveValue;
    if (alsoUpdateMin) {
      newState['min'] = positiveValue;
    }
    this.setState(newState);
    services.setMaxForAttribute(attr, positiveValue);
    if (alsoUpdateMin) {
      services.setMinForAttribute(attr, positiveValue);
    }
  }

  handleAddValueClick = event => {
    this.setState({ showAddValueDialog: true });
  }

  handleAddValueDialogClose = event => {
    this.setState({ 
      showAddValueDialog: false,
      valueToAdd: ''
    });
  }

  handleValueToAddNameChange = event => {
    this.setState({ valueToAdd: event.target.value });
  }

  handleAddValueSubmit = event => {
    services.addValueToAttributeByName(this.state.valueToAdd, this.props.attribute.name);
    var state = {};
    state[this.state.valueToAdd+"Checked"] = true;
    state["showAddValueDialog"] = false;
    state["valueToAdd"] = "";
    this.setState(state);
  }

  handleValueRightClick = value => event => {
    event.preventDefault();
    this.setState({
      valueAnchorEl: event.currentTarget,
      attributeToDeleteValueFrom: this.props.attribute.name,
      valueToDelete: value
    });
  }

  handleAttributeRightClick = event => {
    event.preventDefault();
    this.setState({
      attributeAnchorEl: event.currentTarget,
      attributeToDelete: this.props.attribute.name,
    });
  }

  handleValueRightClickClose = event => {
    this.setState({ valueAnchorEl: null });
  }

  handleAttributeRightClickClose = event => {
    this.setState({ attributeAnchorEl: null });
  }

  handleValueDeleteClick = event => {
    services.deleteValueFromAttribute(this.state.attributeToDeleteValueFrom, this.state.valueToDelete);
    this.setState({
      valueAnchorEl: null,
      attributeToDeleteValueFrom: '',
      valueToDelete: ''
    });
  }

  handleAttributeDeleteClick = event => {
    services.deleteAttributeByName(this.state.attributeToDelete);
    this.setState({
      attributeAnchorEl: null,
      attributeToDelete: ''
    });
    this.props.attributeDeletedCallback();
  }
}

SongAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  attributeDeletedCallback: PropTypes.func.isRequired
}

export default SongAttribute;
