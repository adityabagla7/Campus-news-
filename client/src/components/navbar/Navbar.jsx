import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import "./navbar.scss";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", icon: <HomeOutlinedIcon />, label: "Home" },
    { path: "/events", icon: <EventIcon />, label: "Events" },
    { path: "/groups", icon: <GroupsIcon />, label: "Groups" },
    { path: "/announcements", icon: <AnnouncementIcon />, label: "Announcements" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <span className="logo-icon">📰</span>
            <span className="logo-text">Campus News</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-only">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActiveRoute(item.path) ? "active" : ""}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <SearchOutlinedIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search campus news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="navbar-right">
          {/* Theme Toggle */}
          <button className="icon-button theme-toggle" onClick={toggle}>
            {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
            <span className="desktop-only">{darkMode ? "Light" : "Dark"}</span>
          </button>

          {/* Notifications */}
          <div className="notification-container">
            <button className="icon-button notification-button">
              <NotificationsOutlinedIcon />
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button>
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <Link to={`/profile/${currentUser.id}`} className="profile-link">
              <img
                src={currentUser.profilePic || "/default-avatar.png"}
                alt={currentUser.name}
                className="profile-image"
              />
              <div className="user-info desktop-only">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">Student</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle mobile-only" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <div className="mobile-user-section">
            <img
              src={currentUser.profilePic || "/default-avatar.png"}
              alt={currentUser.name}
              className="mobile-profile-image"
            />
            <div className="mobile-user-info">
              <span className="mobile-user-name">{currentUser.name}</span>
              <span className="mobile-user-role">Student</span>
            </div>
          </div>

          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActiveRoute(item.path) ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mobile-menu-footer">
            <button className="mobile-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;