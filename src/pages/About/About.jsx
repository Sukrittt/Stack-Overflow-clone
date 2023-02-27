import React, { useEffect } from "react";
import { gsap } from "gsap";

import "./About.css";
import LinkedIn from "../../assets/Social Icons/linkedin.png";
import GitHub from "../../assets/Social Icons/github.png";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";

const About = () => {
  //gsap
  useEffect(() => {
    gsap.fromTo(
      "li",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.15,
      }
    );
  }, []);

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div className="main-bar" style={{ marginTop: "5.25em" }}>
          <h3 className="about-h3">
            StackClone: A MERN-Based Replication of StackOverflow
          </h3>
          <p className="about-p">
            Introducing my StackOverflow clone, built using the MERN stack. This
            project was made possible through my participation in a MERN stack
            course, where I honed my skills and learned the fundamental
            concepts. I took the knowledge acquired from the course and added my
            own creative touch, implementing new features and functionalities to
            enhance the user experience.
          </p>
          <p className="about-p">
            In this website, the following features have been incorporated:
          </p>
          <ul>
            <li className="about-p">
              User <span className="keyword">authentication</span> (Log In /
              Sign up).
            </li>
            <li className="about-p">
              Asking and answering <span className="keyword">questions.</span>
            </li>
            <li className="about-p">
              <span className="keyword">Search</span> function for questions,
              users, and comments.
            </li>
            <li className="about-p">
              Ability to <span className="keyword">vote</span> on questions and{" "}
              <span className="keyword">delete</span> questions/answers.
            </li>
            <li className="about-p">
              Individual <span className="keyword">profile pages</span>
              with option to add self-description.
            </li>
            <li className="about-p">
              Random <span className="keyword">avatars</span> are assigned to
              each user's profile, with the user being able to change it.
            </li>
            <li className="about-p">
              <span className="keyword">Adding</span> and{" "}
              <span className="keyword">removing</span> friends.
            </li>
            <li
              className="about-p"
              style={{ lineHeight: "1.5em", marginTop: "2px" }}
            >
              Implementation of a{" "}
              <span className="keyword">friend request</span> system that
              requires users to <span className="keyword">accept</span> or
              <span className="keyword">decline</span> requests made by other
              users.
            </li>
            <li className="about-p">
              Platform for <span className="keyword">sharing</span> programming
              experiences with community.
            </li>
            <li className="about-p">
              A separate <span className="keyword">notifications</span> page
              where all friend requests, user comments' likes and dislikes and
              when their question is answered will be featured.
            </li>
            <li className="about-p">
              Added animations with{" "}
              <span className="keyword">Framer Motion</span> and{" "}
              <span className="keyword">GSAP</span>, creating an engaging user
              experience.
            </li>
            <li className="about-p">
              Here is the older version of the website that I made after
              completing a course:
              <a
                href="https://stack-overflow-clone-old-version.netlify.app/"
                style={{ color: "#39739d", paddingLeft: "3px" }}
              >
                https://stack-overflow-clone-old-version.netlify.app/.
              </a>
            </li>
          </ul>
          <hr />
          <p className="about-p developer-description">
            If you'd like to check out my work, you can find my projects on my
            Github page and connect with me on Linked In.
          </p>
          <div className="flex" style={{ justifyContent: "center" }}>
            <div className="frame">
              <a
                href="https://www.linkedin.com/in/sukrit-saha-b6117a242/"
                className="btn"
              >
                <img src={LinkedIn} alt="linkedin-logo" />
              </a>
              <a href="https://github.com/Sukrittt" className="btn">
                <img src={GitHub} alt="github-logo" />
              </a>
            </div>
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default About;
