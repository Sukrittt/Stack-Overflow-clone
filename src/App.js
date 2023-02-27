import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import RoutePage from "./RoutePage";
import Navbar from "./components/Navbar/Navbar";
import {
  fetchAllUsers,
  getUpdatedUser,
  updateUserNotification,
} from "./actions/users";
import { setCurrentUser } from "./actions/currentUser";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllComments } from "./actions/comments";
import Alert from "./components/Toast/Alert/Alert";
import { SidebarProvider } from "./components/SideBarContext/SideBarContext";
import { AuthContextProvider } from "./components/SideBarContext/AuthContext";

function App() {
  const currentUser = useSelector((state) => state.currentUserReducer); // the profile which is logged in
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updatedUser = JSON.parse(localStorage.getItem("UpdatedProfile"));

  const msgRead = [];
  updatedUser &&
    updatedUser?.result.notifications.map((message) => {
      msgRead.push(message._id);
    });

  //toast visibility
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  //logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); //to navigate to home page if user has logged out in any other page
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    dispatch(fetchAllQuestions()); // every time there is a change in dispatch, it will fetch all questions
    dispatch(fetchAllUsers()); // same for this, it will fetch all user details all the time
    dispatch(fetchAllComments()); // display all comments all the time
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(updateUserNotification(currentUser?.result._id, msgRead)); //update user's notification
      dispatch(getUpdatedUser(currentUser?.result._id))
        .then((errorStatus) => {
          if (errorStatus === 401) {
            handleLogout();
            navigate("/auth");
            setTimeout(() => {
              setTimeout(() => {
                setAlert(false);
              }, 2500);
              setAlert(true);
              setAlertText("You have been logged out due to inactivity.");
            }, 500);
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [currentUser]);

  return (
    <div className="App" data-scroll-container>
      <AuthContextProvider>
        <SidebarProvider>
          <Navbar />
          <div data-scroll-section>
            <div className="warning-div">
              {/* Warning to be displayed for 2.5s */}
              {alert && <Alert type="Alert" text={alertText} />}
            </div>
            <RoutePage />
          </div>
        </SidebarProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
