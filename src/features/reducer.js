const initialState = {
  data: []
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_DATA':
      return {
        ...state,
        data: state.data.concat(action.payload),
      };

    default:
      return state;
  }
};

export default dataReducer;
