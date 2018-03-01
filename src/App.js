import React, { Component } from 'react';
import Data from './features/Data/Data';
import Form from './features/Form/Form';

class App extends Component {
  render() {
    return (
      <div>
        <Form />
        <Data />
      </div>
    );
  }
}

export default App;
