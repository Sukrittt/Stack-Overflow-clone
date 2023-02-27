//import all functions from the API
import * as api from "../api";

import { getUpdatedUser } from "./users";
import { setCurrentUser } from "./currentUser";

//signup
export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile")))); // Storing the data in the redux store
    navigate("/"); //to navigate to the home page after signing in
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
};

//login
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(getUpdatedUser(data?.result._id));
    navigate("/"); //to navigate to the home page after signing in
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
};
