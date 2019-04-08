import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GeneratedTemplate extends Component {
  render() {
    var t = this.props.template;

    return (
      <div>
        <div>
          <p>Instruments</p>
          {t.instruments.map(inst => <p>{inst.name}</p>)}
        </div>

        <div>
          <p>Attributes</p>
          {t.attributes.map(attribute => <p>{attribute.name + ": " + attribute.value}</p>)}
        </div>
      </div>
    );
  }
}

GeneratedTemplate.propTypes = {
  template: PropTypes.object.isRequired
}

export default GeneratedTemplate;
