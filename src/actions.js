export const fetchData = () => {
  return (dispatch, state, api) => {
    return api('', 'get')
      .then(({ data }) => dispatch(receiveData(data)))
      .catch(console.log);
  };
};

export const receiveData = payload => ({
  type: 'RECEIVE_DATA',
  payload,
});
