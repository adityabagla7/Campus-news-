import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-content">
          <div className="welcome-section">
            <h1>Welcome to Campus News</h1>
            <p>Stay connected with your campus community. Share updates, discover events, and engage with fellow students.</p>
          </div>
          
          <Share />
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Home;