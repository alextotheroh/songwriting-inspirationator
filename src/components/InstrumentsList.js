import React, { Component } from 'react';
import * as services from '../services/Services';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

class InstrumentsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      instruments: services.getInstruments()
    }
  }

  render() {

    var instruments = <div>
      {this.state.instruments.map(instrument => {
        return <div className="InstrumentsList-item" key={instrument.name}>
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
      </div>
    );
  }

  handleAddInstrumentClick = event => {

  }
}

export default InstrumentsList;
