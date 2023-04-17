import React from 'react';

function Home() {
    return (
        <div>
          <header>
            <h1>Welcome to PhotoShare</h1>
            <nav>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Explore</a></li>
                <li><a href="#">Notifications</a></li>
                <li><a href="#">Profile</a></li>
              </ul>
            </nav>
          </header>
          <main>
            <h2>Featured Photos</h2>
            <div className="featured-photos">
              {/* Display featured photos here */}
            </div>
            <h2>Latest Photos</h2>
            <div className="latest-photos">
              {/* Display latest photos here */}
            </div>
          </main>
          <footer>
            <p>&copy; 2023 PhotoShare. All rights reserved.</p>
          </footer>
        </div>
      );
}
export default Home