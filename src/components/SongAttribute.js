import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SongAttribute extends Component {

  constructor(props) {
    super(props);

    this.state = {
      enabled: props.attribute.enabled
    };
  }

  render() {

    var attribute = this.props.attribute;
    var instruments = this.props.instruments;

    const enabledSwitch =
      <FormControlLabel
          control={
            <Switch
              checked={this.state.enabled}
              onChange={this.handleEnabledSwitch}
              onClick={e => e.stopPropagation()}
              value="enabled"
            />
          }
      />;

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <span className="SongAttribute-attrName">{attribute.name}</span>
            <span className="SongAttribute-switch">{enabledSwitch}</span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

          </ExpansionPanelDetails>
        </ExpansionPanel>  
      </div>
    );
  }

  handleEnabledSwitch = event => {
    this.setState({
      enabled: event.target.checked
    });
  }
}

SongAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  instruments: PropTypes.array.isRequired
}

export default SongAttribute;
