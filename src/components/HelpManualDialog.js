import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class HelpManualDialog extends Component {

  handleClose = () => {
    this.props.onClose();
  }

  getHelpManual = (currentUrl) => {
    if (currentUrl.includes('generate-a-song-template')) {
      return this.generateSongTemplateHelp;
    } else if (currentUrl.includes('start-a-song')) {
      return this.startASongHelp;
    } else if (currentUrl.includes('find-an-instrument')) {
      return this.findAnInstrumentHelp;
    } else if (currentUrl.includes('generate-a-bassline')) {
      return this.generateABasslineHelp;
    } else {
      return <p>You should never see this. This is an error. Neat!</p>;
    }
  }

  generateSongTemplateHelp = (
    <div>
      <h3><i>Generate a Song Template</i></h3><br />
      <strong>What is this?</strong>
      <p>This tool allows you to configure some options for a song based on your instruments, tastes, etc., then randomly generate a song template that draws from those options.</p>
      <br/>
      <strong>What can I do?</strong><br/>
      <p>- Enable or disable an instrument by clicking the checkbox next to it.  Disabled instruments won't ever be selected for the template.</p>
      <p>- Enable or disable an atribute by clicking the slider button on the attribute card.  Disabled attributes won't appear in the generated template.</p>
      <p>- Enable or disable a specific value in an attribute by clicking the checkbox next to it.</p>
      <p>- Some attributes use min/max values.  These are editable.  When the template is generated, a random number between these values is chosen (inclusive).</p>
      <p>- Add a new instrument by clicking the "Add Instrument" button in the expanded instruments panel.</p>
      <p>- Delete an instrument by right clicking it and selecting "delete."</p>
      <p>- Delete an entire attribute by right clicking the attribute panel and selecting "delete entire attribute."</p>
      <p>- Delete a value inside an attribute by right clicking the value and selecting "delete."</p>
      <p>- Add a whole new attribute by right clicking the "Song Attributes" heading, then clicking "Add new attribute..."</p>
      <p>- Print the generated template by clicking the print button.</p>
    </div>
  );

  startASongHelp = (
    <div>
      <h3><i>Start a Song</i></h3><br />
      <strong>What is this?</strong>
      <p>This tool allows you to configure some different ways to start a song, and randomly pick one from those options.</p>
      <br/>
      <strong>What can I do?</strong><br/>
      <p>- Pick one at random by clicking the "Randomly Pick One" button.</p>
      <p>- Add a new choice by clicking the "Add One" button.</p>
      <p>- Delete one by right clicking it and selecting "Delete."</p>
    </div>
  );

  findAnInstrumentHelp = (
    <div>
      <h3><i>Find an Instrument</i></h3><br />
      <strong>What is this?</strong>
      <p>This tool allows you to configure some different categories of instruments and populate the categories with the instruments you have 
        available for your songs.  This way, if you ever find yourself thinking "This part needs more bass... what are my options?" you can get an answer with a couple clicks.</p>
      <br/>
      <strong>What can I do?</strong><br/>
      <p>- Add a new category by clicking the "Add Category" button.</p>
      <p>- Add a new instrument by right clicking the name of the category and selecting "Add Instrument."</p>
      <p>- Delete a category by right clicking the category name and selecting "Delete Category."</p>
      <p>- Delete an instrument from a category by right clicking the instrument and selecting "Delete Instrument."</p>
    </div>
  );

  generateABasslineHelp = (
    <div>
      <h3><i>Generate a Bassline</i></h3><br />
      <strong>What is this?</strong>
      <p>This tool allows you to configure a number of notes between 1-8, and randomly generate a bass riff in A minor containing that many notes.</p>
      <br/>
      <strong>What can I do?</strong><br/>
      <p>- Change the notes per riff by clicking "Change Number of Notes" (must be an integer 1-8).</p>
      <p>- Generate a random bassline by clicking "Generate Random Bassline"</p>
    </div>
  );

  render() {
    return (
      <Dialog
      open={this.props.open}
      onClose={this.handleClose}>
      <DialogContent>
        {this.getHelpManual(this.props.currentUrl)}
        <br/><br/><hr />

        <p><i>
          The customizations you make will be saved to your local browser, but will be lost if you clear your browser cache or move to a different machine.
          The "Export Configuration" button allows you to save your customizations to a file, which you can then import later.
        </i></p>
        
        <p><i>
          For help with a different tool, click into that tool, then click "Help."
        </i></p>
      </DialogContent>
    </Dialog>
    );
  }

}

HelpManualDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUrl: PropTypes.string.isRequired
}

export default HelpManualDialog;
