import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import * as services from '../services/Services';

class SongAttribute extends Component {

  constructor(props) {
    super(props);

    this.state = {
      enabled: props.attribute.enabled
    };
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
          <div key={attribute+"-"+value}>{"- " + value}</div>
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
            {values}
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
}

SongAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  instruments: PropTypes.array.isRequired
}

export default SongAttribute;
