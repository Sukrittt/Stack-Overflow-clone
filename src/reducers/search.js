const initialState = {
  searchInput: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_INPUT":
      return {
        ...state,
        searchInput: action.searchInput,
      };
    default:
      return state;
  }
};

export default searchReducer;
