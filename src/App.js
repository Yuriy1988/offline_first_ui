import React, { Component } from 'react';
import { connect } from 'react-redux';

const MapStateToProps = (state) => ({
  data: state,
});

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        Hi
      </div>
    );
  }
}

export default connect(MapStateToProps)(App);
