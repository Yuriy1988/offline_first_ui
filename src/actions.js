import {
  getDbData,
  saveToDb,
  deleteItemFromDb,
  markForDeletion,
  merge,
} from './utils/dbInteractions';

import uuidv4 from 'uuid/v4';

export const fetchData = () => {
  return async (dispatch, state, api) => {
    const { serverAvailable } = state().data;
    const apiUrl = serverAvailable ? 'data' : 'fake';

    const dbData = await getDbData();
    const filtered = dbData.filter(item => !item.markedForDeletion);

    try {
      const response = await api(apiUrl);
      dispatch(receiveDataList([...filtered, ...response.data]));
    } catch(e) {
      dispatch(receiveDataList(filtered));
    }
  };
};

export const updateData = (data) => {
  return async (dispatch, state, api) => {
    const { serverAvailable } = state().data;
    const apiUrl = serverAvailable ? 'data' : 'fake';

    try {
      const response = await api(apiUrl, 'post', data);
      await saveToDb(data);
      dispatch(updatedData(response.data));
    } catch (e) {
      await saveToDb({ ...data, isSynced: false });
      dispatch(updatedData({ ...data, isSynced: false }));
    }
  };
};

export const serverSync = () => {
  return async (dispatch, state, api) => {
    const { serverAvailable } = state().data;
    const apiUrl = serverAvailable ? 'data' : 'fake';

    try {
      const unsyncedData = await getDbData();

      unsyncedData.forEach(item => {
        if (!item.isSynced) {
          dispatch(updateData({ ...item, isSynced: true }));
        }

        if (item.markedForDeletion) {
          dispatch(deleteItem(item.id));
        }
      });

      const response = await api(apiUrl);
      await merge(response.data);
      dispatch(receiveDataList(response.data));
    } catch(e) {
      // todo
    }
  };
};

export const deleteItem = (id) => {
  return async (dispatch, state, api) => {
    const { serverAvailable } = state().data;
    const apiUrl = serverAvailable ? 'data' : 'fake';
    try {
      await api(`${apiUrl}/${id}`, 'delete', id);
      await deleteItemFromDb(id);
      dispatch(deletedItem(id));
    } catch(e) {
      await markForDeletion(id);
      dispatch(deletedItem(id));
    }
  };
};

export const checkHealth = () => {
  return async (dispatch, state, api) => {
    const { serverAvailable } = state().data;
    const apiUrl = serverAvailable ? '' : 'fake';

    try {
      await api(apiUrl);
      dispatch(receiveHealthStatus('online'));
    } catch(e) {
      dispatch(receiveHealthStatus('offline'));
    }
  };
};

export const addData = (data) => {
  return async (dispatch, state, api) => {
    const { serverAvailable } = state().data;
    const apiUrl = serverAvailable ? '' : 'fake';
    const id = uuidv4();
    try {
      const response = await api(apiUrl, 'post', { ...data, isSynced: true, id });
      await saveToDb(response.data);
      dispatch(addedData(response.data));
    } catch(e) {
      await saveToDb({ ...data, isSynced: false, id });
      dispatch(addedData({ ...data, isSynced: false, id }));
    }
  };
};

export const toggleServer = payload => ({
  type: 'TOGGLE_SERVER',
  payload,
});

export const addedData = payload => ({
  type: 'ADDED_DATA_ITEM',
  payload,
});

export const updatedData = payload => ({
  type: 'UPDATED_DATA_ITEM',
  payload,
});

export const deletedItem = payload => ({
  type: 'DELETED_DATA_ITEM',
  payload,
});

export const receiveHealthStatus = (payload) => ({
  type: 'RECEIVE_HEALTH_STATUS',
  payload,
});

export const receiveDataList = payload => ({
  type: 'RECEIVE_DATA_LIST',
  payload,
});
