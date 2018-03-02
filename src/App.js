import React, { Component } from 'react';
import DataList from './dataList/dataList';
import CreateData from './createData/createData';

class App extends Component {
  render() {
    return (
      <div>
        <CreateData />
        <DataList />
      </div>
    );
  }
}

export default App;
