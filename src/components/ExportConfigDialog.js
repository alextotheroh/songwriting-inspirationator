import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ExportConfigDialog extends Component {

  render() {
    return (
      <Dialog
      open={this.props.open}
      onClose={this.handleClose}>
      <DialogTitle>Export Configuration</DialogTitle>
      <DialogContent>
        Your settings are saved to your browser every time you make a change.  <br/><br/>If you clear your browser cache or move to a different machine, however, 
        your settings will be lost!  <br/><br/>Exporting your settings allows you to reimport them later using the generated file.  
        <br/><br/>It also allows you to share your settings with others.<br/><br/><br/>

        <a download="si-config.txt" href={this.props.exportHref}>Click here to export current configuration</a>
      </DialogContent>
    </Dialog>
    );
  }

  handleClose = () => {
    this.props.onClose();
  }
}

ExportConfigDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  exportHref: PropTypes.string.isRequired
}

export default ExportConfigDialog;
