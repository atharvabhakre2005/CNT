import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the Online Bookstore</h1>
          <p className="hero-subtitle">
            Discover your next favorite book with us.
          </p>
          <p className="hero-description">
            Explore our vast collection of books across all genres. From
            timeless classics to contemporary bestsellers, we have something for
            every reader.
          </p>
          <Link to="/catalogue" className="cta-button">
            Browse Our Collection
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
