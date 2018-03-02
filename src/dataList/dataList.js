import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Database from '../Database';
import { fetchData } from '../actions';

const mapStateToProps = (state) => ({
  data: state.data.data,
});

const mapDispatchToProps = {
  fetchData,
};

class DataList extends Component {
  constructor() {
    super();
    this.subs = [];
  }

  componentDidMount() {
    this.props.fetchData();
  }

  loadFromDb = async () => {
    const db = await Database.get();

    const sub = db.formdata.find()
      .sort({ key: 1 }).$.subscribe(data => {
        if (!data) { return }
        this.setState({ data });
      });

    this.subs.push(sub);
  };

  componentWillUnmount() {
    this.subs.forEach(sub => sub.unsubscribe());
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
