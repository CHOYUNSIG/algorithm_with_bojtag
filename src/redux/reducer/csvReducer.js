const initialState = {};

const csvReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        [action.name]: action.table,
      };
    default:
      return state;
  }
};

export default csvReducer;
