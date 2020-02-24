import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as services from '../backend/services/Services';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class StartASongRoot extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      newOneText: ''
    }
  }

  handlePickRandomClick = () => {
    const chosenString = services.pickRandomWayToStartASong();
    this.setChosenStyle(chosenString);
  }

  setChosenStyle = (chosenString) => {
    var textContainers = document.querySelectorAll(".way-container");

    textContainers.forEach(e => {
      e.classList.remove("selected-way-to-write-a-song"); // remove previous if exists

      if (e.textContent === chosenString) {
        e.classList.add("selected-way-to-write-a-song");
      }
    })
  }

  handleAddOneClick = () => {
    this.setState( {dialogOpen: true} );
  }

  handleDeleteItemClick = () => {
    services.removeWayToStartASong(this.state.anchorEl.innerHTML);
    window.location.reload();
  }

  handleDialogClose = e => {
    this.setState( {dialogOpen: false} );
  }

  handleAddOneInputChange = (e) => {
    this.setState({
      newOneText: e.target.value
    })
  }

  handleSubmitNewOneClick = () => {
    services.addWayToStartASong(this.state.newOneText);
    window.location.reload();
  }

  handleItemRightClick = e => {
    e.preventDefault();
    this.setState({
      anchorEl: e.currentTarget
    });
  }

  handleItemRightClickClose = e => {
    this.setState({
      anchorEl: null
    });
  }

  render() {

    var addOneDialog = (
      <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}>
          <div style={{width: 1000}} />
          <DialogTitle>Add a Way to Start a Song</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              rows="10"
              onChange={this.handleAddOneInputChange}
            />
            <div style={{width: '110px', marginLeft: 'auto', marginRight: 0, marginTop: '30px'}}>
              <Button size="large" className="theme-button-2" onClick={this.handleSubmitNewOneClick}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
    );

    var rightClickItemMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleItemRightClickClose}>
        <MenuItem onClick={this.handleDeleteItemClick}>
          Delete
        </MenuItem>
      </Menu>
    );

    return (
        <div className="theme-content-container">
          <Grid container spacing={3}>
            {services.getWaysToStartASong().map(wayToStartASongString => {
              return <Grid item>
                <div className="StartASongRoot-itemContainer" onContextMenu={this.handleItemRightClick}>
                  <Paper className="StartASongRoot-paper way-container"><Typography variant="body1">{wayToStartASongString}</Typography></Paper>
                </div>
              </Grid>
            })}
          </Grid>

          <div className="StartASongRoot-buttonsContainer">
            <Button size="large" className="theme-button-1" onClick={this.handlePickRandomClick}>Randomly Pick One</Button>
            <Button size="large" className="theme-button-1" onClick={this.handleAddOneClick}>Add one</Button>
          </div>

          {addOneDialog}
          {rightClickItemMenu}
        </div>

    );
  }

}

export default StartASongRoot;
