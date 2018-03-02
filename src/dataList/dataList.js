import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions';

const mapStateToProps = (state) => ({
  data: state.data.data,
});

const mapDispatchToProps = {
  fetchData,
};

class DataList extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        <h3>Data info</h3>
        <ul>
          {this.props.data.length === 0 && <span>Loading..</span>}
          {this.props.data.map(dataItem => {
            return (
              <li key={dataItem.id}>
                <div>value: {dataItem.value}</div>
                <div>key: {dataItem.key}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataList);
