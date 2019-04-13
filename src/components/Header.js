import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false
    }
  }

  render() {
    return (
      <div>
        <div className="Header-container">
          <div className="Header-title">
            Songwriting Inspirationator
          </div>
          <div className="Header-helpIconContainer">
            <IconButton onClick={this.handleHelpClick}>
              <HelpOutlineIcon color='primary'/>
            </IconButton>
          </div>
        </div>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}>
          <div style={{width: 1000}} />
          <DialogTitle>Help</DialogTitle>
          <DialogContent>
            <strong>What is this?</strong>
            <p>This tool allows you to configure some options for a song based on your instruments, tastes, etc., then randomly generate a song template that draws from those options.</p>
            <p>The customizations you make will be saved to your local browser, but will be lost if you clear your browser cache or move to a different machine.
              The "Export Configuration" button allows you to save your customizations to a file, which you can then import later.</p><br/>
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
            
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  handleHelpClick = e => {
    this.setState( {dialogOpen: true} );
  }

  handleDialogClose = e => {
    this.setState( {dialogOpen: false} );
  }
}

export default Header;
