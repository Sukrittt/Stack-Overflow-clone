import React from "react";
import { Route, Routes } from "react-router-dom";

//components
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Auth from "./pages/auth/Auth";
import Questions from "./pages/Questions/Questions";
import AskQuestions from "./pages/AskQuestions/AskQuestions";
import DisplayQuestion from "./Questions/DisplayQuestion";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";
import Social from "./pages/Social/Social";
import PostComment from "./pages/Social/PostComment";
import Friends from "./pages/Friends/Friends";
import Notifications from "./pages/Notifications/Notifications";

const RoutePage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/notifications" element={<Notifications />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/auth" element={<Auth />} />
      <Route exact path="/questions" element={<Questions />} />
      <Route exact path="/AskQuestions" element={<AskQuestions />} />
      <Route exact path="/questions/:id" element={<DisplayQuestion />} />
      <Route exact path="/tags" element={<Tags />} />
      <Route exact path="/user" element={<Users />} />
      <Route exact path="/user/:id" element={<UserProfile />} />
      <Route exact path="/social" element={<Social />} />
      <Route exact path="/postComment" element={<PostComment />} />
      <Route exact path="/friends" element={<Friends />} />
    </Routes>
  );
};

export default RoutePage;
