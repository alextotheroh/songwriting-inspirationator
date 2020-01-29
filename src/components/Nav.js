import React, { Component } from 'react';
import StartASongRoot from './StartASongRoot.js';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";


class Nav extends Component {

  render() {
    return (

      <div className="Nav-container">
          <Grid container justify="center">
            <Grid item xs={1.5}><Button fullWidth size="large" className="theme-font-2 font-size-20"><Link to="/start-a-song"><strong>start a song</strong></Link></Button></Grid>
            <Grid item xs={1.5}><Button fullWidthh size="large" className="theme-font-2 font-size-20"><Link to="/find-an-instrument"><strong>find an instrument</strong></Link></Button></Grid>
            <Grid item xs={1.5}><Button fullWidthh size="large" className="theme-font-2 font-size-20"><Link to="/generate-a-bassline"><strong>generate a bassline</strong></Link></Button></Grid>
          </Grid>
      </div>

    );
  }

}

export default Nav;
