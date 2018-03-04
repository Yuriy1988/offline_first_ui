import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, deleteItem } from '../../actions';
import { getData } from '../../reducer';
import DataItem from './DataItem/DataItem';

const mapStateToProps = (state) => ({
  data: getData(state),
});

const mapDispatchToProps = {
  fetchData,
  deleteItem,
};

class DataList extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  deleteItem = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <h3>Info</h3>
        <ul>
          {data.length === 0 && <span>Loading..</span>}
          {data.map(dataItem => (
            <DataItem
              dataItem={dataItem}
              deleteItem={this.deleteItem}
              key={dataItem.id}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataList);
