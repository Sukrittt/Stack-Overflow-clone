const authReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "AUTH":
      // Storing individial element in localStorage
      // We have mentioned '?.' because if we just mention '.' then if action.data is not available then it will throw an error
      // But if we write '?.' then if action.data is not available then it will ignore the error
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };
    case "LOGOUT":
      localStorage.clear(); //will clear the localStorage which stored user details
      return { ...state, data: null };
    default:
      return state;
  }
};

export default authReducer;
