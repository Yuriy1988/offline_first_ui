import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import styles from './serverHelath.module.scss';
import { checkHealth, serverSync } from '../actions';

class ServerStatus extends Component {
  componentDidMount() {
    this.props.checkHealth();
  }

  tryToSync = () => {
    this.props.serverSync();
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
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ serverHealth: state.data.serverHealth }),
  { checkHealth, serverSync }
)(ServerStatus);
