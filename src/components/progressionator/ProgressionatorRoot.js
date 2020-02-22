import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import * as services from '../../backend/services/Services';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import WesternMusicScale from '../../backend/models/WesternMusicScale';
import ProgressionatorService from '../../backend/services/ProgressionatorService';
import { connect } from 'react-redux';
import progressionatorReducer from '../../redux/reducers/progressionatorReducer';
import PropTypes from 'prop-types';

class ProgressionatorRoot extends Component {

  constructor(props) {
    super(props);

    this.westernMusicScale = new WesternMusicScale();
    this.progressionatorService = new ProgressionatorService(this.westernMusicScale);
  }

  render() {

    return (
        <div className="theme-content-container">
          <span>Root Note: &nbsp;&nbsp;&nbsp;</span>
          <Select
            value={this.props.rootNote}
            onChange={this.handleRootNoteChange}
          >
            {this.westernMusicScale.getNotes().map((note) =>
              <MenuItem value={note}>{note}</MenuItem>
            )}
          </Select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>Mode: &nbsp;&nbsp;&nbsp;</span>
          <Select
            value={this.props.modeName}
            onChange={this.handleModeChange}
          >
            {this.progressionatorService.getModeNames().map((modeName) =>
              <MenuItem value={modeName}>{modeName}</MenuItem>
            )}
          </Select>
        </div>
    );
  }

  handleRootNoteChange = (e) => {
    this.setState({
      rootNote: e.target.value
    });
  }

  handleModeChange = (e) => {
    this.setState({
      mode: e.target.value
    });
  }
}

function mapStateToProps(state) {
  return {
      rootNote: progressionatorReducer.rootNote,
      modeName: progressionatorReducer.modeName
  };
}

ProgressionatorRoot.propTypes = {
  rootNote: PropTypes.string,
  modeName: PropTypes.string
}

export default connect(mapStateToProps)(ProgressionatorRoot);
