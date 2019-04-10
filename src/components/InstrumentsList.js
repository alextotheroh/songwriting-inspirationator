import React, { Component } from 'react';
import * as services from '../services/Services';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        return <div className="InstrumentsList-item">- {instrument.name}</div>;
      })}
    </div>

    return (
      <div className="InstrumentsList-container">
        <ExpansionPanel className="InstrumentsList-expansionPanel">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <span className="InstrumentsList-title">Available Instruments</span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {instruments}
          </ExpansionPanelDetails>
        </ExpansionPanel>  
      </div>
    );
  }
}

export default InstrumentsList;
