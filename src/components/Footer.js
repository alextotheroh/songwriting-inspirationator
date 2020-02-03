import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import ExportConfigDialog from './ExportConfigDialog';
import ImportConfigDialog from './ImportConfigDialog';
import * as services from '../services/Services';

class Footer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      showAddAttributeDialog: false,
      showExportConfigDialog: false,
      showImportConfigDialog: false,
      exportHref: ''
    }
  }

  componentWillMount(props) {
    this.setState({
      exportHref: "data:application/octet-stream;charset=utf-8;base64," + services.getBase64EncodedState()
    });
  }

  handleExportClick = e => {
    this.setState({
      showExportConfigDialog: true
    });
  }

  handleExportDialogClose = () => {
    this.setState({
      showExportConfigDialog: false
    });
  }

  handleImportClick = e => {
    this.setState({
      showImportConfigDialog: true
    });
  }

  handleImportDialogClose = () => {
    this.setState({
      showImportConfigDialog: false
    });
  }

  // needed because controlling mins/maxes inside of expansion panels 
  // from props that change over time is stupid complex.  Refreshing on import is ezpz.
  handleConfigImported = () => {
    window.location.reload();
  }

  render() {
    return (
      <div className="Footer-container theme-color-1">

        <span className="Footer-buttons-container">
          <Button variant="contained" color="secondary" size="small" onClick={this.handleExportClick}>
            <span className="Body-white">Export Configuration</span>&nbsp;&nbsp;
            <ArchiveOutlinedIcon style={{color: "f0f0f0"}} />
          </Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="secondary" size="small" onClick={this.handleImportClick}>
            <span className="Body-white">Import Configuration</span>&nbsp;&nbsp;
            <UnarchiveOutlinedIcon style={{color: "f0f0f0"}} />
          </Button>
        </span>

        <ExportConfigDialog open={this.state.showExportConfigDialog} onClose={this.handleExportDialogClose} exportHref={this.state.exportHref} />
        <ImportConfigDialog open={this.state.showImportConfigDialog} onClose={this.handleImportDialogClose} importedConfigCallback={this.handleConfigImported}/>  
      </div>
    );
  }
}

export default Footer;
