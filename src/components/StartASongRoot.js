import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as services from '../services/Services';
import { Typography } from '@material-ui/core';

class StartASongRoot extends Component {

  render() {
    return (

        <Grid container spacing={24} className="StartASongRoot-gridContainer">
          {services.getWaysToStartASong().map(wayToStartASongString => {
            return <Grid item>
              <div className="StartASongRoot-itemContainer">
                <Paper className="StartASongRoot-paper"><Typography variant="body1">{wayToStartASongString}</Typography></Paper>
              </div>
            </Grid>
          })}
        </Grid>

    );
  }

}

export default StartASongRoot;
