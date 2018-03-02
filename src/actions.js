import { loadFromDb } from './utils/dataBaseSync';

export const fetchData = () => {
  return (dispatch, state, api) => {
    return api('', 'get')
      .then(({ data }) => dispatch(receiveData(data)))
      .catch(() => {
        loadFromDb().then((data) => {
          return dispatch(receiveData(data));
        });
      });
  };
};

export const receiveData = payload => ({
  type: 'RECEIVE_DATA',
  payload,
});
