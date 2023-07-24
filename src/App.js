import React from "react";
import styles from "./index.css";
import Sqs from "./Sqs";

const App = () => {
  return (
    <>
      <body>
        <div class="sidebar">
          <h2 class="sidebar-title">Dashboard</h2>
          <ul class="my-custom-list">
            <li class="sidebar-element">
              <a href="#">Home</a>
            </li>
            <li class="sidebar-element">
              <a href="#">Sales Analytics</a>
            </li>
            <li class="sidebar-element">
              <a href="#">Map of Store Sales</a>
            </li>
          </ul>
          <div class="sidebar-bottom-logout">
            <i class="fas fa-sign-out-alt"></i>
            <p class="logout-text">logout</p>
          </div>
        </div>
        <div class="main-content">
          <h1>Map of Store Sales</h1>
          <div class="columns">
            <div class="left-column">
              <div class="section dash-section">
                <Sqs></Sqs>
              </div>
            </div>
            <div class="right-column">
              <div class="stats-section1">
                <h3>graph 1</h3>
                <div class="graph-outline"></div>
              </div>
              <div class="stats-section2">
                <h3>graph 2</h3>
                <div class="graph-outline"></div>
              </div>
              <div class="stats-section3">
                <h3>graph 3</h3>
                <div class="graph-outline"></div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default App;
