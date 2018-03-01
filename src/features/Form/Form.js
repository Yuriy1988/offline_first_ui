import React, { Component } from 'react';

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
    console.log(this.state);
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

export default Form;
