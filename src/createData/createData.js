import React, { Component } from 'react';
import axios from 'axios';
import * as Database from '../Database';

class HeroInsert extends Component {
  state = {
    key: '',
    value: '',
  };

  insertToServer = async () => {
    const { key, value } = this.state;
    try {
      const { data } = await axios
        .post('http://localhost:3001/data',
          { key, value }
        );
    } catch (error) {
      this.insertToDb();
    }
  };

  insertToDb = async () => {
    const { key, value } = this.state;
    const db = await Database.get();
    db.formdata.insert({ key, value });
    this.setState({ key: '', value: '' });
  };

  handleKeyChange = (event) => {
    this.setState({ key: event.target.value });
  };

  handleValueChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    this.insertToServer();
  };

  render() {
    return (
      <div
        className='box'
        id='insert-box'
      >
        <h3>Create data</h3>
        <input
          onChange={this.handleKeyChange}
          onKeyPress={this.handleKeyPress}
          placeholder='Key'
          type='text'
          value={this.state.key}
        />
        <input
          onChange={this.handleValueChange}
          onKeyPress={this.handleKeyPress}
          placeholder='Value'
          type='text'
          value={this.state.value}
        />
        <button onClick={this.insertToServer}>Save data</button>
      </div>
    );
  }
}

export default HeroInsert;
