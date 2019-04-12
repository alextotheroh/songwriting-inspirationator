import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as services from '../services/Services';

class ExportConfigDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      exportHref: "data:application/octet-stream;charset=utf-8;base64," + services.getBase64EncodedState()
    };
  }
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

        <a download="config.sicfg" href={this.state.exportHref}>Click here to export current configuration</a>
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
  onClose: PropTypes.func.isRequired
}

export default ExportConfigDialog;
