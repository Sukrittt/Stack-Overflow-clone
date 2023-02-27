const userReducer = (states = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;
    case "UPDATE_CURRENT_USER":
      return states.map(
        (state) => (state._id === action.payload._id ? action.payload : state)
        // to get the details of only one user which matches the id and return the new record, else return the old record
        // state - all records's id
        // action.payload - one record's id
      );
    default:
      return states;
  }
};

export default userReducer;
