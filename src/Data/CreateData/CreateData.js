import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addData } from '../../actions';

const mapDispatchToProps = {
  addData,
};

class HeroInsert extends Component {
  state = {
    key: '',
    value: '',
  };

  handleKeyChange = (event) => {
    this.setState({ key: event.target.value });
  };

  handleValueChange = (event) => {
    this.setState({ value: event.target.value });
  };

  addData = () => {
    const { key, value } = this.state;
    this.props.addData({ key, value });
    this.setState({ key: '', value: '' });
  };

  render() {
    return (
      <div>
        <h3>Create data</h3>
        <input
          onChange={this.handleKeyChange}
          placeholder='Key'
          type='text'
          value={this.state.key}
        />
        <input
          onChange={this.handleValueChange}
          placeholder='Value'
          type='text'
          value={this.state.value}
        />
        <button onClick={this.addData}>Save data</button>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(HeroInsert);
