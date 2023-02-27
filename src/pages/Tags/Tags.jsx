import React from "react";
import { useSelector } from "react-redux";

import "./tags.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import TagsList from "./TagsList";

const Tags = () => {
  //sample tags
  const toggleList = [
    {
      id: 1,
      tagName: "javascript",
      tagDesc:
        "For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript).",
    },
    {
      id: 2,
      tagName: "python",
      tagDesc:
        "Python is a multi-paradigm, dynamically typed, multi-purpose programming language.",
    },
    {
      id: 3,
      tagName: "java",
      tagDesc:
        "Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself.",
    },
    {
      id: 4,
      tagName: "javascript",
      tagDesc:
        'C# (pronounced "see sharp") is a high-level, statically typed, multi-paradigm programming language developed by Microsoft.',
    },
    {
      id: 5,
      tagName: "android",
      tagDesc:
        "Android is Google's mobile operating system, used for programming or developing digital devices.",
    },
    {
      id: 6,
      tagName: "html",
      tagDesc:
        "HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser.",
    },
    {
      id: 7,
      tagName: "css",
      tagDesc:
        "CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look and formatting of HTML and SVG elements including colors, layout, fonts, and animations.",
    },
    {
      id: 8,
      tagName: "reactjs",
      tagDesc:
        "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be efficient and flexible.",
    },
    {
      id: 9,
      tagName: "c",
      tagDesc:
        "C is a general-purpose programming language used for system programming (OS and embedded), libraries, games and cross-platform.",
    },
    {
      id: 10,
      tagName: "mongodb",
      tagDesc:
        "MongoDB is a scalable, high-performance, open source, document-oriented NoSQL database. It supports a large number of languages and application development platforms.",
    },
  ];

  //search text stored in redux-store
  const search = useSelector(
    (state) => state.searchReducer.searchInput
  ).toLowerCase();

  //Will filter out the tags whose tagName do not match the search text
  const searchedTags = toggleList.filter((user) =>
    user.tagName.toLowerCase().includes(search)
  );

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div className="main-bar">
          <h1 className="tags-h1">Tags</h1>
          <p className="tags-p label">
            A tag is a keyword or label that categorizes your question with
            other, similar questions.
          </p>
          <p className="tags-p label">
            Using the right tags makes it easier for others to find and answer
            your question.
          </p>
          <div className="tags-list-container">
            {searchedTags.map((tag) => (
              <TagsList tag={tag} key={tag.id} />
            ))}
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Tags;
