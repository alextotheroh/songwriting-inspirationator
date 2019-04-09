import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
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

    this.state = initialStateObj;
  }

  render() {

    var attribute = this.props.attribute;
    //var instruments = this.props.instruments;

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
        <div>{"min: " + attribute.min}</div>
        <div>{"max: " + attribute.max}</div>
      </div>
    } else if (attribute.name === "Minimum Instruments Count") {
      values = <div>
        {"min: " + attribute.value}
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
}

SongAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  instruments: PropTypes.array.isRequired
}

export default SongAttribute;
