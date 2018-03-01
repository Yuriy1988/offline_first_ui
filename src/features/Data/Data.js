import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  data: state.data.data,
});

class Data extends Component {
  render() {
    const { data } = this.props;

    return <div>
      {data.map(item => {
        return (
          <div>
            <div>
            Key: {item.key}
            </div>
            <div>
            Value:  {item.value}
            </div>
          </div>
        );
      })}
    </div>
  }
}

export default connect(
  mapStateToProps,
)(Data);
