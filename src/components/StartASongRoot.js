import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as services from '../services/Services';
import { Typography } from '@material-ui/core';

class StartASongRoot extends Component {

  handlePickRandomClick = () => {
    const chosenString = services.pickRandomWayToStartASong();
    this.setChosenStyle(chosenString);
  }

  setChosenStyle = (chosenString) => {
    var textContainers = document.querySelectorAll(".way-container");

    textContainers.forEach(e => {
      e.classList.remove("selected-way-to-write-a-song");

      console.log(e.textContent)
      if (e.textContent === chosenString) {
        e.classList.add("selected-way-to-write-a-song");
      }
    })
  }

  render() {
    return (
        <div>
          <Grid container spacing={24} className="StartASongRoot-gridContainer">
            {services.getWaysToStartASong().map(wayToStartASongString => {
              return <Grid item>
                <div className="StartASongRoot-itemContainer">
                  <Paper className="StartASongRoot-paper way-container"><Typography variant="body1">{wayToStartASongString}</Typography></Paper>
                </div>
              </Grid>
            })}
          </Grid>

          <div className="StartASongRoot-buttonsContainer">
            <Button size="large" className="theme-button-1" onClick={this.handlePickRandomClick}>Randomly Pick One</Button>
            <Button size="large" className="theme-button-1">Add one</Button>
          </div>
        </div>

    );
  }

}

export default StartASongRoot;
