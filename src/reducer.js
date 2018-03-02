const initialState = {
  data: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return {
        ...state,
        data: action.payload,
      };

    case 'ADD_DATA':
      return {
        ...state,
        data: state.data.concat(action.payload),
      };

    default:
      return state;
  }
}
