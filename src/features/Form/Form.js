import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveData } from '../actions';

const mapDispatchToProps = {
  saveData,
};

class Form extends Component {
  state = {
    key: '',
    value: '',
  };

  onChange = (key, e) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  saveData = () => {
    this.props.saveData(this.state);
  };

  render() {
    return (
      <div>
        <div>
          <label>
            <input
              onChange={this.onChange.bind(null, 'key')}
              type='text'
              value={this.state.key}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              onChange={this.onChange.bind(null, 'value')}
              type='text'
              value={this.state.value}
            />
          </label>
        </div>
        <button onClick={this.saveData}>
          Save
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Form);
