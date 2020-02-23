import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import WesternMusicScale from '../../backend/models/WesternMusicScale';
import ProgressionatorService from '../../backend/services/ProgressionatorService';
import { connect } from 'react-redux';
import { changeMode, changeRootNote } from '../../redux/actions/progressionatorActions';
import PropTypes from 'prop-types';
import Scale from '../../backend/models/Scale';
import { Typography } from '@material-ui/core';

class ProgressionatorRoot extends Component {

  constructor(props) {
    super(props);

    this.westernMusicScale = new WesternMusicScale();
    this.progressionatorService = new ProgressionatorService(this.westernMusicScale);
  }

  render() {

    return (
      <div className="theme-content-container">
        <span className="theme-color-1 theme-font-2" style={{fontSize: "30px"}}>Root Note:</span>
        <Select
          className="ProgressionatorRoot-select"
          value={this.props.rootNote}
          onChange={this.handleRootNoteChange}
          style={{marginLeft: '40px'}}
        >
          {this.westernMusicScale.getNotes().map((note) =>
            <MenuItem value={note}>{note}</MenuItem>
          )}
        </Select><br/>

        <div style={{marginTop: "10px"}}>  
          <span className="theme-color-1 theme-font-2" style={{fontSize: "30px"}}>Mode:</span>
          <Select
            className="ProgressionatorRoot-select"
            value={this.props.modeName}
            onChange={this.handleModeChange}
            style={{marginLeft: '92px'}}
          >
            {this.progressionatorService.getModeNames().map((modeName) =>
              <MenuItem value={modeName}>{modeName}</MenuItem>
            )}
          </Select>
        </div>
        
        <div className="ProgressionatorRoot-scaleNotes">
          <Typography component="span" className="theme-font-2">
            {this.getNotesForMode().map((note) => {
            return <span style={{marginRight: "50px"}}>{note}</span>
            })}
          </Typography>
        </div>

        <div className="ProgressionatorRoot-chordNames">   
          <Typography component="span" className="theme-font-2">
            {this.getDiatonicChordsForSelectedMode().map((chord) => {
              return <span style={{marginRight: "50px"}}>{chord.getName()}</span>
            })}
          </Typography>
        </div> 
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
