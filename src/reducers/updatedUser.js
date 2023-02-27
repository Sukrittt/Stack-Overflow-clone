const updatedUserReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "UPDATED_PROFILE":
      localStorage.setItem(
        "UpdatedProfile",
        JSON.stringify({ ...action?.data })
      );
      return { ...state, data: action?.data };
    default:
      return state;
  }
};

export default updatedUserReducer;
