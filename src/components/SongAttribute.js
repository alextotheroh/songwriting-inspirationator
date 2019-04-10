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
          <div key={attribute+"-"+value}>
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

    return (
      <div className="SongAttribute-container">
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
        </ExpansionPanel>  
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
}

SongAttribute.propTypes = {
  attribute: PropTypes.object.isRequired
}

export default SongAttribute;
