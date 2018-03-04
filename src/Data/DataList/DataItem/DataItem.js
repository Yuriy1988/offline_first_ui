import React from 'react';
import cx from 'classnames';
import styles from './dataItem.module.scss';

const DataItem = ({ dataItem, deleteItem }) => {
  const itemClassName = cx({
    [styles.item]: true,
    [styles.offline]: !dataItem.isSynced,
  });

  return (
    <li className={itemClassName}>
      <div>
        <div className={styles.status}>
          <b>{dataItem.isSynced ? 'synced' : 'is not synced'}</b>
        </div>
        <div>value: {dataItem.value}</div>
        <div>key: {dataItem.key}</div>
      </div>
      <div>
        <button onClick={deleteItem.bind(null, dataItem.id)}>Delete</button>
      </div>
    </li>
  );
};

export default DataItem;
