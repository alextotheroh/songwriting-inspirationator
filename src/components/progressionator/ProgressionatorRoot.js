import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import WesternMusicScale from '../../backend/models/WesternMusicScale';
import ProgressionatorService from '../../backend/services/ProgressionatorService';
import { connect } from 'react-redux';
import { changeMode, changeRootNote } from '../../redux/actions/progressionatorActions';
import PropTypes from 'prop-types';
import Scale from '../../backend/models/Scale';
import { Typography } from '@material-ui/core';
import * as Tone from "tone";

class ProgressionatorRoot extends Component {

  constructor(props) {
    super(props);

    this.westernMusicScale = new WesternMusicScale();
    this.progressionatorService = new ProgressionatorService(this.westernMusicScale)
    this.pattern = null;
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
            <MenuItem value={note.split(" ")[0]}>{note.split(" ")[0]}</MenuItem>
          )}
        </Select><br/>

        <div style={{marginTop: "10px", marginBottom: "20px"}}>  
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

        <Paper style={{padding: '40px 20px'}}>     
          <div className="ProgressionatorRoot-scaleNotes">
            <Typography component="span" className="theme-font-mono">
              {this.getNotesForMode().map((note) => {
              return <span style={{marginRight: "50px"}}>{note}</span>
              })}<span id="tone-play-toggle-scale" onClick={this.handlePlayScaleClick}>play</span>
            </Typography>
          </div>

          <Grid container spacing={1} className="ProgressionatorRoot-chordNames">
            {this.props.diatonicChordsForSelectedMode.map((chord) => {
              return (
                <Grid item xs className="theme-font-mono">
                  <div className="ProgressioantorRoot-chordContainer">
                    <div>{chord.getFunction()}</div>
                    <div>{chord.getName()}</div>
                  </div>
                </Grid>
              )
            })}
          </Grid> 
        </Paper>
      </div>
    );
  }

  handleRootNoteChange = (e) => {
    this.props.dispatch(changeRootNote(e.target.value));
  }

  handleModeChange = (e) => {
    this.props.dispatch(changeMode(e.target.value));
  }

  getNotesForMode = () => {
    var scale = new Scale(this.props.rootNote, this.props.modeName);

    return scale.getNotes();
  }

  handlePlayScaleClick = () => {
    Tone.Transport.stop();
    var scale = new Scale(this.props.rootNote, this.props.modeName)
    var volume = new Tone.Volume(-11).toMaster();
    var reverb = new Tone.JCReverb(0.4).connect(volume);
    var vibrato = new Tone.Vibrato(6, .1).connect(reverb);
    var dist = new Tone.Distortion(0.8).connect(vibrato);
    var synthA = new Tone.Synth({
      oscillator: {
        type: 'triangle',
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).connect(dist)

    var noteOctaveNotationScale = scale.getNotes().map(note => note);
    noteOctaveNotationScale.push(scale.getNotes()[0]); // add the upper octave
    console.log(noteOctaveNotationScale);

    if (this.pattern) {
      this.pattern.stop();
    }
    this.pattern = new Tone.Pattern(function(time, note){
      synthA.triggerAttackRelease(note, .25);
    }, noteOctaveNotationScale);
    this.pattern.interval = "8n";
    this.pattern.iterations = 8;

    this.pattern.start(0);

    Tone.Transport.loopEnd = '1m';
    Tone.Transport.loop = false;
    Tone.Transport.start();
  }
}

function mapStateToProps(state) {
  return {
      rootNote: state.progressionatorReducer.rootNote,
      modeName: state.progressionatorReducer.modeName,
      diatonicChordsForSelectedMode: state.progressionatorReducer.diatonicChordsForSelectedMode
  };
}

ProgressionatorRoot.propTypes = {
  rootNote: PropTypes.string,
  modeName: PropTypes.string,
  diatonicChordsForSelectedMode: PropTypes.array
}

export default connect(mapStateToProps)(ProgressionatorRoot);
