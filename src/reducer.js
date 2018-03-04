import omit from 'object.omit';
const initialState = {
  data: [],
  serverHealth: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_DATA_LIST': {
      return {
        ...state,
        data: action.payload
          .reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
      };
    }

    case 'UPDATED_DATA_ITEM': {
      const { id } = action.payload;

      return {
        ...state,
        data: {
          ...state.data,
          [id]: action.payload,
        },
      };
    }

    case 'DELETED_DATA_ITEM': {
      return {
        ...state,
        data: {
          ...omit(state.data, action.payload),
        },
      };
    }

    case 'ADDED_DATA_ITEM': {
      const { id } = action.payload;

      return {
        ...state,
        data: {
          ...state.data,
          [id]: action.payload,
        },
      };
    }

    case 'RECEIVE_HEALTH_STATUS': {
      return {
        ...state,
        serverHealth: action.payload,
      };
    }

    default:
      return state;
  }
}

export const getData = (state) => Object.keys(state.data.data)
  .map(key => state.data.data[key])
  .filter(item => !item.markedForDeletion);
