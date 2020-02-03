import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as services from '../services/Services';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class FindAnInstrumentRoot extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      newCategoryText: '',
      newInstrumentText: ''
    }
  }

  handleAddCategoryClick = () => {
    this.setState( {dialogOpen: true} );
  }

  handleDeleteCategoryClick = () => {
    services.deleteInstrumentByFrequencyCategory(this.state.categoryAnchorEl.innerHTML);
    window.location.reload();
  }

  handleDeleteItemClick = () => {
    console.log(this.state.itemAnchorEl.innerHTML);
    console.log(this.state.itemAnchorEl.parentElement.innerHTML);
    services.deleteInstrumentByFrequency(this.state.itemAnchorEl.innerHTML, this.state.itemAnchorEl.parentElement.innerHTML);
    window.location.reload();
  }

  handleDialogClose = e => {
    this.setState( {dialogOpen: false} );
  }

  handleAddCategoryInputChange = (e) => {
    this.setState({
      newCategoryText: e.target.value
    })
  }

  handleAddInstrumentInputChange = (e) => {
    this.setState({
      newInstrumentText: e.target.value
    });
  }

  handleSubmitNewCategoryClick = () => {
    services.addInstrumentsByFrequencyCategory(this.state.newCategoryText);
    window.location.reload();
  }

  handleSubmitNewInstrumentClick = () => {
    services.addInstrumentByFrequency(this.state.newInstrumentText, this.state.categoryAnchorEl.innerHTML);
    window.location.reload();
  }

  handleAddInstrumentClick = () => {
    this.setState({
      addInstrumentDialogOpen: true
    });
  }

  handleCategoryRightClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      categoryAnchorEl: e.currentTarget
    });
  }

  handleItemRightClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      itemAnchorEl: e.currentTarget
    });
  }

  handleCategoryRightClickClose = () => {
    this.setState({
      categoryAnchorEl: null
    });
  }

  handleItemRightClickClose = () => {
    this.setState({
      itemAnchorEl: null
    });
  }

  render() {

    var addCategoryDialog = (
      <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}>
          <div style={{width: 1000}} />
          <DialogTitle>Add a Category</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="outlined"
              onChange={this.handleAddCategoryInputChange}
            />
            <div style={{width: '110px', marginLeft: 'auto', marginRight: 0, marginTop: '30px'}}>
              <Button size="large" className="theme-button-2" onClick={this.handleSubmitNewCategoryClick}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
    );

    var addInstrumentDialog = (
      <Dialog
          open={this.state.addInstrumentDialogOpen}
          onClose={this.handleAddInstrumentDialogClose}>
          <div style={{width: 1000}} />
          <DialogTitle>Add an Instrument</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="outlined"
              onChange={this.handleAddInstrumentInputChange}
            />
            <div style={{width: '110px', marginLeft: 'auto', marginRight: 0, marginTop: '30px'}}>
              <Button size="large" className="theme-button-2" onClick={this.handleSubmitNewInstrumentClick}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
    );

    var rightClickCategoryMenu = (
      <Menu
        anchorEl={this.state.categoryAnchorEl}
        open={Boolean(this.state.categoryAnchorEl)}
        onClose={this.handleCategoryRightClickClose}>
        <MenuItem onClick={this.handleAddInstrumentClick}>
          Add Instrument
        </MenuItem>
        <MenuItem onClick={this.handleDeleteCategoryClick}>
          Delete Category
        </MenuItem>
      </Menu>
    );

    var rightClickItemMenu = (
      <Menu
        anchorEl={this.state.itemAnchorEl}
        open={Boolean(this.state.itemAnchorEl)}
        onClose={this.handleItemRightClickClose}>
        <MenuItem onClick={this.handleDeleteItemClick}>
          Delete Instrument
        </MenuItem>
      </Menu>
    );

    return (
        <div className="theme-content-container">
          <Grid container spacing={24}>
            {services.getInstrumentsByFrequency().map(obj => {
              return (
                <Grid item xs={4}>
                  <div onContextMenu={this.handleCategoryRightClick}>
                    <Paper style={{padding: '20px'}}>
                      <div className="theme-font-1 theme-color-black font-size-20">{obj.category}</div><br />
                      {obj.instruments.map(instrument => {
                        return (
                          <Typography variant="body1" onContextMenu={this.handleItemRightClick}>{instrument}</Typography>
                        );
                      })}
                    </Paper>
                  </div>
                </Grid>
              );
            })}
          </Grid>

          <div className="StartASongRoot-buttonsContainer">
            <Button size="large" className="theme-button-1" onClick={this.handleAddCategoryClick}>Add category</Button>
          </div>

          {addCategoryDialog}
          {addInstrumentDialog}
          {rightClickCategoryMenu}
          {rightClickItemMenu}
        </div>

    );
  }

}

export default FindAnInstrumentRoot;
