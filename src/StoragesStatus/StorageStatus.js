import React, { Component } from 'react';
import RxDB from 'rxdb';

class StorageStatus extends Component {
  state = {
    idb: false,
    websql: false,
    sqlite: false,
  };

  async componentDidMount() {
    const idb = await RxDB.checkAdapter('idb');
    const websql = await RxDB.checkAdapter('websql');
    const sqlite = await RxDB.checkAdapter('cordova-sqlite');

    /* eslint-disable-next-line */
    this.setState({
      idb,
      websql,
      sqlite,
    });
  }

  getAvailability(condition) {
    return condition
      ? <b style={{ color: 'green' }}>'Available'</b>
      : <b style={{ color: 'red' }}>'Unavailable'</b>;
  }

  render() {
    const { idb, sqlite, websql } = this.state;
    return (
      <div>
        <div>
          <b>LocalStorage:</b> <b style={{ color: 'green' }}>Is Available </b>
          by default on any platform but not supported by <b>RXDB</b> since ver. 6.4.0
        </div>
        <div><b>IndexedDB:</b> {this.getAvailability(idb)}</div>
        <div><b>WebSql:</b> {this.getAvailability(websql)}</div>
        <div><b>SQLite:</b> {this.getAvailability(sqlite)}</div>
      </div>
    );
  }
}

export default StorageStatus;
