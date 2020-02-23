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
import { changeMode, changeRootNote } from '../../redux/actions/progressionatorActions';
import PropTypes from 'prop-types';
import Scale from '../../backend/models/Scale';
import { Typography } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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
            className="ProgressionatorRoot-select theme-color-1"
            value={this.props.rootNote}
            onChange={this.handleRootNoteChange}
            variant='outlined'
          >
            {this.westernMusicScale.getNotes().map((note) =>
              <MenuItem value={note}>{note}</MenuItem>
            )}
          </Select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>Mode: &nbsp;&nbsp;&nbsp;</span>
          <Select
            className="ProgressionatorRoot-select"
            value={this.props.modeName}
            onChange={this.handleModeChange}
            input={
              <OutlinedInput
                name="mode"
              />
            }
          >
            {this.progressionatorService.getModeNames().map((modeName) =>
              <MenuItem value={modeName}>{modeName}</MenuItem>
            )}
          </Select>

          <Typography>
            {this.getNotesForMode().map((note) => {
            return <span>{note}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            })}
          </Typography>

          <Typography>
            {this.getDiatonicChordsForSelectedMode().map((chord) => {
              return <span>{chord.getName()}&nbsp;&nbsp;&nbsp;</span>
            })}
          </Typography>
        </div>
    );
  }

  handleRootNoteChange = (e) => {
    this.props.dispatch(changeRootNote(e.target.value));
  }

  handleModeChange = (e) => {
    this.props.dispatch(changeMode(e.target.value));
  }

  getDiatonicChordsForSelectedMode = () => {
    var scale = new Scale(this.props.rootNote, this.props.modeName);

    return scale.getDiatonicChords();
  }

  getNotesForMode = () => {
    var scale = new Scale(this.props.rootNote, this.props.modeName);

    return scale.getNotes();
  }
}

function mapStateToProps(state) {
  return {
      rootNote: state.progressionatorReducer.rootNote,
      modeName: state.progressionatorReducer.modeName
  };
}

ProgressionatorRoot.propTypes = {
  rootNote: PropTypes.string,
  modeName: PropTypes.string
}

export default connect(mapStateToProps)(ProgressionatorRoot);
