import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import * as services from '../services/Services';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

class GenerateABassline extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bassline: services.getRandomBasslineAsArray(),
      notesPerBassline: services.getNotesPerBassline(),
      changeNumberOfNotesDialogOpen: false,
      newNumberOfNotes: null
    };
  }

  handleGenerateClick = () => {
    this.setState({
      bassline: services.getRandomBasslineAsArray()
    });
  }

  handleChangeNumberOfNotesClick = () => {
    this.setState({
      changeNumberOfNotesDialogOpen: true
    });
  }

  handleChangeNumberOfNotesDialogClose = () => {
    this.setState({
      changeNumberOfNotesDialogOpen: false
    });
  }

  handleNumberOfNotesInputChange = (e) => {
    this.setState({
      newNumberOfNotes: e.target.value
    });
  }

  handleSubmitNewNumberOfNotes = () => {
    const validationErrorMessage = "The new value must be an integer between 1 and 8.";
    var newVal = parseInt(this.state.newNumberOfNotes);

    if (!newVal || newVal < 1 || newVal > 8) {
      alert(validationErrorMessage);
      return;
    }

    services.changeNotesPerBassline(this.state.newNumberOfNotes);
    window.location.reload();
  }

  render() {

    var changeNumberOfNotesDialog = (
      <Dialog
          open={this.state.changeNumberOfNotesDialogOpen}
          onClose={this.handleChangeNumberOfNotesDialogClose}>
          <div style={{width: 1000}} />
          <DialogTitle>Set Notes per Bassline</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="outlined"
              onChange={this.handleNumberOfNotesInputChange}
            />
            <div style={{width: '110px', marginLeft: 'auto', marginRight: 0, marginTop: '30px'}}>
              <Button size="large" className="theme-button-2" onClick={this.handleSubmitNewNumberOfNotes}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
    );

    return (
        <div className="theme-body-container">

          <Paper className="GenerateABasslineRoot-tablatureContainer">
            {this.state.bassline.map(string => {
              return <div>{string}</div>
            })}
          </Paper>

          <div className="StartASongRoot-buttonsContainer">
            <Button size="large" className="theme-button-1" onClick={this.handleGenerateClick}>Generate Random Bassline</Button>
            <Button size="large" className="theme-button-1" onClick={this.handleChangeNumberOfNotesClick}>Change Number of Notes ({this.state.notesPerBassline})</Button>
          </div>

          {changeNumberOfNotesDialog}
        </div>
    );
  }
}

export default GenerateABassline;
