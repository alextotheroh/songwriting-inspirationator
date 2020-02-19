import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dropzone from 'react-dropzone';
import * as services from '../backend/services/Services';

class ImportConfigDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fileName: null,
      fileContents: null,
      configFromFileError: null
    };
  }
  render() {
    return (
      <Dialog
      open={this.props.open}
      onClose={this.handleClose}>
      <div style={{width: 600}} />
      <DialogTitle>Import Configuration</DialogTitle>
      <DialogContent>
        Import configuration from a file. <br/><br/>WARNING: this erases all the current settings!

        <Dropzone onDrop={acceptedFiles => this.setUploadedFile(acceptedFiles)} accept=".txt">
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()} className="ImportConfigDialog-dropzone">
                <input {...getInputProps()} />
                <p className="ImportConfigDialog-dropzoneText">Drag and drop .sicfg file here, or click to select file</p>
              </div>
            </section>
          )}
        </Dropzone>

        {this.state.fileName ?
          <div><strong>Settings to import:</strong> &nbsp;{this.state.fileName}</div>
          : ''} 

        {this.state.configFromFileError ? 
          <div style={{color: '#F4364C'}}>{this.state.configFromFileError}</div>
          : ''}  
      </DialogContent>
      
      {this.state.fileName ? 
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Import
          </Button>
        </DialogActions>
        : ''}
    </Dialog>
    );
  }

  handleClose = () => {
    this.setState({
      fileName: null,
      fileContents: null
    });
    this.props.onClose();
  }

  handleSubmit = () => {
    var setConfigFromFileResponse = services.setStateFromFileContents(this.state.fileContents);

    if (setConfigFromFileResponse !== "ok") {
      this.setState({
        configFromFileError: setConfigFromFileResponse
      });
    } else {
      this.props.importedConfigCallback();
      this.handleClose();
    }
  }

  setUploadedFile = files => {
    var f = files[0];
    var reader = new FileReader();
    reader.onload = () => {
      this.setState({
        fileName: f.name,
        fileContents: reader.result
      });
    }
    reader.readAsText(f);
  }
}

ImportConfigDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  importedConfigCallback: PropTypes.func.isRequired
}

export default ImportConfigDialog;
