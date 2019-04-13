import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';

class GeneratedTemplate extends Component {
  render() {
    var t = this.props.template;

    return (
      <div>
        <div className="GeneratedTemplate-container">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div>
                <div className="GeneratedTemplate-sectionTitle">Instruments</div>
                {t.instruments.map(inst => <p className="GeneratedTemplate-listItem">
                  {inst.name}
                </p>)}
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="GeneratedTemplate-attributesContainer">
                <div className="GeneratedTemplate-sectionTitle">Attributes</div>
                {t.attributes.map(attribute => <p className="GeneratedTemplate-listItem" key={attribute.name}>
                  <strong className="sectionTitleSmall">{attribute.name}</strong> <span>{": " + attribute.value}</span>
                </p>)}
              </div>
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" color="secondary" size="small" onClick={this.handlePrintClick} style={{marginLeft: '65%'}}>
          <span className="Body-white">Print Template</span>&nbsp;&nbsp;
          <PrintOutlinedIcon style={{color: "f0f0f0"}} />
        </Button>
      </div>
    );
  }

  handlePrintClick = e => {
    window.print();
  }
}

GeneratedTemplate.propTypes = {
  template: PropTypes.object.isRequired
}

export default GeneratedTemplate;
