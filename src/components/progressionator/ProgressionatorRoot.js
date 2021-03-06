import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import WesternMusicScale from '../../backend/models/WesternMusicScale';
import ProgressionatorService from '../../backend/services/ProgressionatorService';
import { connect } from 'react-redux';
import { changeMode, changeRootNote, changeExtendChords } from '../../redux/actions/progressionatorActions';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Scale from '../../backend/models/Scale';
import Switch from '@material-ui/core/Switch';
import { Typography, Menu } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import * as Tone from "tone";
import Chord from '../../backend/models/Chord';

class ProgressionatorRoot extends Component {

  constructor(props) {
    super(props);

    this.westernMusicScale = new WesternMusicScale();
    this.progressionatorService = new ProgressionatorService(this.westernMusicScale)
    this.pattern = null;

    this.state = {
      chordSlotAnchorEl: null,
      progressionChords: [null, null, null, null, null, null, null, null]
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.rootNote !== prevProps.rootNote ||
      this.props.modeName !== prevProps.modeName) {
      this.updateProgressionChordsForNewKey();
    }
  }

  render() {
    var allNotes = this.westernMusicScale.getNotes();
    var notesToChooseFrom = [];
    for (var i = 0; i < 12; i++) {
      notesToChooseFrom.push(allNotes[i]);
    }

    return (
      <div className="theme-content-container">

        <div className="theme-font-mono theme-color-1 ProgressionatorRoot-title">
          <strong>{this.props.rootNote.toUpperCase() + " " + this.props.modeName}</strong>
        </div>

        <Paper style={{ padding: '12px 20px 10px 20px', marginTop: '20px' }} elevation={8}>
          <div className="ProgressionatorRoot-scaleNotes">
            <Typography component="span" className="theme-font-mono">
              {this.getNotesForMode().map((note) => {
                return <span style={{ margin: '0 25px' }}>{note.split(" ")[0]}</span>
              })}
              <div className="ProgressionatorRoot-scalePlayButton theme-pop-on-hover" id="tone-play-toggle-scale" onClick={this.handlePlayScaleClick}>
                <PlayArrowIcon />
              </div>
            </Typography>
          </div>
        </Paper>

        <Paper style={{ padding: '40px 20px 20px 20px', marginTop: "30px" }} elevation={8}>
          <Grid container spacing={1} className="ProgressionatorRoot-chordNames">
            {this.props.diatonicChordsForSelectedMode.map((chord) => {
              const notes = chord.getNotes()
              const toolNotes = notes.map((note, i) => {
                return note.split(' ')[0] + ' '
              })
              return (
                // change font if chord name containd min7flat5
                <Grid item xs className="theme-font-mono">
                  <Tooltip title={toolNotes} placement="top">
                    <div className="ProgressionatorRoot-chordContainer theme-pop-on-hover"
                      // onMouseEnter={() => this.handleChordEnter(chord)}
                      onClick={() => this.handlePlayChordClick(chord.getNotes())}>
                      <div>{chord.getFunction()}</div>
                      <div>{chord.getName()}</div>
                    </div>
                  </Tooltip>
                </Grid>
              )
            })}
          </Grid>
          <div className="ProgressionatorRoot-extendChordLabel theme-font-mono">
            <Switch
              checked={this.props.extendChords}
              onChange={this.handleExtendChordsClick}
            /><span>extend chords</span>
          </div>
        </Paper>

        <Paper style={{ padding: "20px", marginTop: "30px" }} elevation={8}>
          <Grid container>
            <Grid item xs>
              <div className="ProgressionatorRoot-chordSlot theme-font-mono theme-pop-on-hover" id="chord-slot-0" onClick={this.handleChordSlotClick}>
                {this.state.progressionChords[0] ? this.state.progressionChords[0].getName() : null}
              </div>
            </Grid>
            <Grid item xs>
              <div className="ProgressionatorRoot-chordSlot theme-font-mono theme-pop-on-hover" id="chord-slot-1" onClick={this.handleChordSlotClick}>
                {this.state.progressionChords[1] ? this.state.progressionChords[1].getName() : null}
              </div>
            </Grid>
            <Grid item xs>
              <div className="ProgressionatorRoot-chordSlot theme-font-mono theme-pop-on-hover" id="chord-slot-2" onClick={this.handleChordSlotClick}>
                {this.state.progressionChords[2] ? this.state.progressionChords[2].getName() : null}
              </div>
            </Grid>
            <Grid item xs>
              <div className="ProgressionatorRoot-chordSlot theme-font-mono theme-pop-on-hover" id="chord-slot-3" onClick={this.handleChordSlotClick}>
                {this.state.progressionChords[3] ? this.state.progressionChords[3].getName() : null}
              </div>
            </Grid>
            <Grid item xs>
              <div className="ProgressionatorRoot-chordSlot theme-font-mono theme-pop-on-hover" id="chord-slot-4" onClick={this.handleChordSlotClick}>
                {this.state.progressionChords[4] ? this.state.progressionChords[4].getName() : null}
              </div>
            </Grid>
            <Grid item xs>
              <div className="ProgressionatorRoot-chordSlot theme-font-mono theme-pop-on-hover" id="chord-slot-5" onClick={this.handleChordSlotClick}>
                {this.state.progressionChords[5] ? this.state.progressionChords[5].getName() : null}
              </div>
            </Grid>
            <Grid item xs>
              <div className="ProgressionatorRoot-chordSlot theme-font-mono theme-pop-on-hover" id="chord-slot-6" onClick={this.handleChordSlotClick}>
                {this.state.progressionChords[6] ? this.state.progressionChords[6].getName() : null}
              </div>
            </Grid>
            <Grid item xs>
              <div className="ProgressionatorRoot-chordSlot theme-font-mono theme-pop-on-hover" id="chord-slot-7" onClick={this.handleChordSlotClick}>
                {this.state.progressionChords[7] ? this.state.progressionChords[7].getName() : null}
              </div>
            </Grid>
          </Grid>

          <div className="ProgressionatorRoot-progressionPlayButton" id="tone-play-toggle-progression" onClick={this.handleProgressionPlayClick}>
            {Tone.Transport.loop ? <StopIcon className="theme-pop-on-hover" /> : <PlayArrowIcon className="theme-pop-on-hover" />}
          </div>
        </Paper>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Select
            className="ProgressionatorRoot-select"
            value={this.props.rootNote}
            onChange={this.handleRootNoteChange}
            style={{ marginRight: '20px' }}
          >
            {notesToChooseFrom.map((note) =>
              <MenuItem value={note.split(" ")[0]}>{note.split(" ")[0].toUpperCase()}</MenuItem>
            )}
          </Select>

          <Select
            className="ProgressionatorRoot-select"
            value={this.props.modeName}
            onChange={this.handleModeChange}
          >
            {this.progressionatorService.getModeNames().map((modeName) =>
              <MenuItem value={modeName}>{modeName}</MenuItem>
            )}
          </Select>
        </div>

        <Menu
          anchorEl={this.state.chordSlotAnchorEl}
          keepMounted
          open={Boolean(this.state.chordSlotAnchorEl)}
          onClose={this.handleChordSlotMenuClose}
        >
          {this.props.diatonicChordsForSelectedMode.map((chord) => {
            return (
              <MenuItem className="theme-font-mono" onClick={() => this.handleChordMenuItemClick(chord)}>
                <strong>{chord.getName().charAt(0).toUpperCase() + chord.getName().slice(1)}</strong>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{chord.getFunction()}</span>
              </MenuItem>);
          })}
        </Menu>
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
    var scale = new Scale(this.props.rootNote, this.props.modeName, this.props.extendChords);

    return scale.getNotes();
  }

  handlePlayScaleClick = () => {
    var scale = new Scale(this.props.rootNote, this.props.modeName, this.props.extendChords)
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

    var notesToPlay = [];
    for (let note of scale.getNotes()) {
      notesToPlay.push(note.replace(/\s/g, ''));
    }
    // add in upper octave
    notesToPlay.push(scale.getNotes()[0].split(" ")[0] + '5')

    var time = Tone.Time('+0.001');

    for (let note of notesToPlay) {
      synthA.triggerAttackRelease(note, '8n', time);
      time = time + Tone.Time('8n');
    }
  }

  handlePlayChordClick = (notes) => {
    var volume = new Tone.Volume(-30).toMaster();
    var reverb = new Tone.JCReverb(0.4).connect(volume);
    var chorus = new Tone.Chorus().connect(reverb);
    chorus.wet.value = 0.5;
    var delay = new Tone.FeedbackDelay(0.25, 0.35).connect(chorus);
    var synth = new Tone.PolySynth(7, Tone.Synth, {
      oscillator: {
        type: 'sawtooth',
      },
      envelope: {
        attack: 0.16,
        decay: 2,
        sustain: 0.9,
        release: 1
      }
    }).connect(delay);

    synth.triggerAttackRelease(notes.map(note => note.replace(/\s/g, '')), 1);
  }

  handleProgressionPlayClick = () => {
    if (Tone.Transport.loop) {
      Tone.Transport.toggle();
      Tone.Transport.cancel();
      Tone.Transport.loop = false;
      this.forceUpdate();
    } else {
      var volume = new Tone.Volume(-30).toMaster();
      var reverb = new Tone.JCReverb(0.4).connect(volume);
      var chorus = new Tone.Chorus().connect(reverb);
      chorus.wet.value = 0.5;
      var synth = new Tone.PolySynth(7, Tone.Synth, {
        oscillator: {
          type: 'sawtooth',
        },
        envelope: {
          attack: 0.16,
          decay: 2,
          sustain: 0.9,
          release: 1
        }
      }).connect(chorus);

      function triggerSynth(chord) {
        //the time is the sample-accurate time of the event
        return (time) => synth.triggerAttackRelease(chord, 1, time)
      }

      var populatedChordSlotsCount = 0;
      for (var i = 0; i < this.state.progressionChords.length; i++) {
        if (this.state.progressionChords[i] != null) {
          Tone.Transport.schedule(
            triggerSynth(this.state.progressionChords[i].getNotes().map(note => note.replace(/\s/g, ''))),
            populatedChordSlotsCount
          );
          populatedChordSlotsCount++;
        }

      }

      Tone.Transport.loopEnd = populatedChordSlotsCount;
      Tone.Transport.loop = true
      Tone.Transport.toggle()
      this.forceUpdate();
    }
  }

  handleChordSlotClick = (e) => {
    this.setState({
      chordSlotAnchorEl: e.target
    });
  }

  handleChordSlotMenuClose = (e) => {
    this.setState({
      chordSlotAnchorEl: null
    });
  }

  handleChordMenuItemClick = (chord) => {
    var chordIndexInProgression = parseInt(this.state.chordSlotAnchorEl.id.split("-")[2]);
    var progressionWithNewChord = this.state.progressionChords.slice(0);
    progressionWithNewChord[chordIndexInProgression] = chord;
    this.setState({
      progressionChords: progressionWithNewChord,
      chordSlotAnchorEl: null
    });
  }

  handleExtendChordsClick = () => {
    if (this.props.extendChords) {
      this.props.dispatch(changeExtendChords(false));
    } else {
      this.props.dispatch(changeExtendChords(true));
    }
  }

  updateProgressionChordsForNewKey = () => {
    console.log(this.props.extendChords)
    var newScale = new Scale(this.props.rootNote, this.props.modeName, this.props.extendChords);
    var transposedProgressionChords = [null, null, null, null, null, null, null, null];

    for (var i = 0; i < this.state.progressionChords.length; i++) {
      if (this.state.progressionChords[i] !== null) {
        var transposedChord = new Chord(newScale.getNotes(), this.state.progressionChords[i].getDegrees());
        transposedProgressionChords[i] = transposedChord;
      }
    }

    this.setState({
      progressionChords: transposedProgressionChords
    });
  }
}

function mapStateToProps(state) {
  return {
    rootNote: state.progressionatorReducer.rootNote,
    modeName: state.progressionatorReducer.modeName,
    diatonicChordsForSelectedMode: state.progressionatorReducer.diatonicChordsForSelectedMode,
    extendChords: state.progressionatorReducer.extendChords
  };
}

ProgressionatorRoot.propTypes = {
  rootNote: PropTypes.string,
  modeName: PropTypes.string,
  diatonicChordsForSelectedMode: PropTypes.array,
  extendsChords: PropTypes.bool
}

export default connect(mapStateToProps)(ProgressionatorRoot);
