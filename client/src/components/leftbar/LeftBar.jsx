import { useContext } from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MessageIcon from "@mui/icons-material/Message";
import BookIcon from "@mui/icons-material/Book";
import SportsIcon from "@mui/icons-material/Sports";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SchoolIcon from "@mui/icons-material/School";
import { AuthContext } from "../../context/authContext";
import "./leftBar.scss";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  const mainMenuItems = [
    { icon: <HomeOutlinedIcon />, label: "News Feed", path: "/" },
    { icon: <EventIcon />, label: "Campus Events", path: "/events" },
    { icon: <GroupsIcon />, label: "Student Groups", path: "/groups" },
    { icon: <AnnouncementIcon />, label: "Announcements", path: "/announcements" },
    { icon: <PhotoLibraryIcon />, label: "Photo Gallery", path: "/gallery" },
    { icon: <MessageIcon />, label: "Messages", path: "/messages" },
  ];

  const campusServices = [
    { icon: <BookIcon />, label: "Academic Resources", path: "/academics" },
    { icon: <LocalLibraryIcon />, label: "Library", path: "/library" },
    { icon: <RestaurantIcon />, label: "Campus Dining", path: "/dining" },
    { icon: <SportsIcon />, label: "Sports & Recreation", path: "/sports" },
    { icon: <SchoolIcon />, label: "Student Services", path: "/services" },
  ];

  const campusStats = [
    { label: "Active Students", value: "2,450" },
    { label: "Faculty Members", value: "184" },
    { label: "Upcoming Events", value: "12" },
    { label: "Student Groups", value: "45" },
  ];

  return (
    <div className="leftBar">
      <div className="leftBar-container">
        {/* User Profile Section */}
        <div className="user-section">
          <Link to={`/profile/${currentUser.id}`} className="user-profile">
            <img
              src={currentUser.profilePic || "/default-avatar.png"}
              alt={currentUser.name}
              className="profile-image"
            />
            <div className="user-info">
              <h3 className="user-name">{currentUser.name}</h3>
              <p className="user-role">Student</p>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="stats-section">
          <h4 className="section-title">Campus Stats</h4>
          <div className="stats-grid">
            {campusStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="menu-section">
          <h4 className="section-title">Navigation</h4>
          <nav className="menu-nav">
            {mainMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="menu-item"
              >
                <div className="menu-icon">{item.icon}</div>
                <span className="menu-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Campus Services */}
        <div className="menu-section">
          <h4 className="section-title">Campus Services</h4>
          <nav className="menu-nav">
            {campusServices.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="menu-item"
              >
                <div className="menu-icon">{service.icon}</div>
                <span className="menu-label">{service.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h4 className="section-title">Quick Actions</h4>
          <div className="action-buttons">
            <button className="action-btn primary">
              <EventIcon />
              Create Event
            </button>
            <button className="action-btn secondary">
              <GroupsIcon />
              Join Group
            </button>
          </div>
        </div>

        {/* Campus News Ticker */}
        <div className="news-ticker">
          <h4 className="section-title">Latest Updates</h4>
          <div className="ticker-content">
            <div className="ticker-item">
              <span className="ticker-badge">New</span>
              <span className="ticker-text">Spring Festival registration is now open!</span>
            </div>
            <div className="ticker-item">
              <span className="ticker-badge">Info</span>
              <span className="ticker-text">Library hours extended for finals week.</span>
            </div>
            <div className="ticker-item">
              <span className="ticker-badge">Event</span>
              <span className="ticker-text">Tech talk by industry experts tomorrow.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;