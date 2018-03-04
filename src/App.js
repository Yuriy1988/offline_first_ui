import React, { Component } from 'react';
import DataList from './Data/DataList/DataList';
import CreateData from './Data/CreateData/CreateData';
import ServerHealth from './ServerHealth/ServerHealth';
import StorageStatus from './StoragesStatus/StorageStatus';

class App extends Component {
  render() {
    return (
      <div>
        <div style={{ maxWidth: '500px' }}>
          <StorageStatus />
          <ServerHealth />
        </div>
        <CreateData />
        <DataList />
      </div>
    );
  }
}

export default App;
