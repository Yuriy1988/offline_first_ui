import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import styles from './serverHelath.module.scss';
import { checkHealth, serverSync, toggleServer } from '../actions';

class ServerStatus extends Component {
  componentDidMount() {
    this.props.checkHealth();
  }

  tryToSync = () => {
    this.props.serverSync();
    this.props.checkHealth();
  };

  toggleServer = () => {
    this.props.toggleServer();
    this.props.checkHealth();
  };

  render() {
    const { serverHealth } = this.props;
    const className = cx({
      [styles.status]: true,
      [styles.offline]: serverHealth === 'offline',
    });

    return (
      <div className={styles.container}>
        Server status: <b className={className}>{serverHealth}</b>
        <div>
          <button onClick={this.tryToSync}>Try to sync with server</button>
          <button onClick={this.toggleServer}>toggleServer availability</button>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ serverHealth: state.data.serverHealth }),
  { checkHealth, serverSync, toggleServer }
)(ServerStatus);
