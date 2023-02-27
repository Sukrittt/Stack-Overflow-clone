import * as api from "../api/index";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, updateData);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

//to send request to add a friend
export const addFriendRequest = (sentBy, sentTo) => async (dispatch) => {
  try {
    const { status } = await api.addFriendRequest(sentBy, sentTo);
    dispatch(fetchAllUsers());
    dispatch(getUpdatedUser(sentBy));
    return status;
  } catch (error) {
    return error.response.status;
  }
};

//to accept the friend request
export const acceptFriendRequest = (sentBy, sentTo) => async (dispatch) => {
  try {
    await api.acceptFriendRequest(sentBy, sentTo);
    dispatch(fetchAllUsers());
    dispatch(getUpdatedUser(sentBy));
  } catch (error) {
    console.log(error);
  }
};
//to send notification type
export const sendNotifyType = (sentBy, sentTo, type) => async (dispatch) => {
  try {
    await api.sendNotifyType(sentBy, sentTo, type);
    dispatch(fetchAllUsers());
    dispatch(getUpdatedUser(sentBy));
  } catch (error) {
    console.log(error);
  }
};
//to decline the friend request
export const declineFriendRequest = (sentBy, sentTo) => async (dispatch) => {
  try {
    await api.declineFriendRequest(sentBy, sentTo);
    dispatch(fetchAllUsers());
    dispatch(getUpdatedUser(sentBy));
  } catch (error) {
    console.log(error);
  }
};

//to send request to delete friend
export const deleteFriend = (sentBy, sentTo) => async (dispatch) => {
  try {
    await api.deleteFriend(sentBy, sentTo);
    dispatch(fetchAllUsers());
    dispatch(getUpdatedUser(sentBy));
  } catch (error) {
    console.log(error);
  }
};

//will run on click of mark all as read
export const markAsRead = (id, msgRead) => async (dispatch) => {
  try {
    await api.markAsRead(id, msgRead);
    dispatch(fetchAllUsers());
    dispatch(getUpdatedUser(id));
  } catch (error) {
    console.log(error);
  }
};

//will update user's notification
export const updateUserNotification = (id, msgRead) => async (dispatch) => {
  try {
    await api.updateUserNotification(id, msgRead);
    dispatch(getUpdatedUser(id));
  } catch (error) {
    console.log(error);
  }
};

//to update the user's details
export const getUpdatedUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getUpdatedUser(userId);
    dispatch({ type: "UPDATED_PROFILE", data });
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
};
