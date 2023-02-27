//api
import * as api from "../api/index";

export const postComment = (commentData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postComment(commentData);
    dispatch({ type: "POST_COMMENT", payload: data });
    dispatch(fetchAllComments());
    navigate("/social");
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllComments = () => async (dispatch) => {
  try {
    const { data } = await api.getComments();
    dispatch({ type: "FETCH_ALL_COMMENTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const voteComment = (value, userId, commentId) => async (dispatch) => {
  try {
    const { data } = await api.voteComment(value, userId, commentId);
    dispatch(fetchAllComments());
  } catch (error) {
    console.log(error);
  }
};
