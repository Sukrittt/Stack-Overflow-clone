import { combineReducers } from "redux";

//reducers
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionReducer from "./questions";
import userReducer from "./users";
import commentReducer from "./comment";
import updatedUserReducer from "./updatedUser";
import searchReducer from "./search";

// combining all reducers together
export default combineReducers({
  authReducer,
  currentUserReducer,
  questionReducer,
  userReducer,
  commentReducer,
  updatedUserReducer,
  searchReducer,
});
