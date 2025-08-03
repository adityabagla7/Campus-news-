import { useState } from "react";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import InfoIcon from "@mui/icons-material/Info";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import "./announcements.scss";

const Announcements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All", count: 28 },
    { id: "urgent", name: "Urgent", count: 3 },
    { id: "academic", name: "Academic", count: 12 },
    { id: "events", name: "Events", count: 8 },
    { id: "general", name: "General", count: 5 },
  ];

  const announcements = [
    {
      id: 1,
      title: "Final Exam Schedule Released",
      content: "The final examination schedule for Spring 2024 has been released. Students can check their exam dates and timings on the student portal. Make sure to prepare accordingly.",
      category: "academic",
      priority: "urgent",
      author: "Academic Office",
      authorImage: "https://images.pexels.com/photos/159844/book-reading-reading-book-girl-159844.jpeg?auto=compress&cs=tinysrgb&w=1600",
      date: "2024-03-10",
      time: "09:00 AM",
      pinned: true,
      views: 1247,
    },
    {
      id: 2,
      title: "Campus Wi-Fi Maintenance",
      content: "The campus Wi-Fi will undergo maintenance on March 15th from 2:00 AM to 6:00 AM. Internet services may be temporarily unavailable during this period.",
      category: "general",
      priority: "high",
      author: "IT Department",
      authorImage: "https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=1600",
      date: "2024-03-08",
      time: "02:30 PM",
      pinned: false,
      views: 892,
    },
    {
      id: 3,
      title: "Spring Festival Registration Open",
      content: "Registration for the Spring Festival 2024 is now open! Students can register their teams for various competitions including dance, music, drama, and technical events.",
      category: "events",
      priority: "normal",
      author: "Event Committee",
      authorImage: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1600",
      date: "2024-03-07",
      time: "11:15 AM",
      pinned: true,
      views: 2156,
    },
    {
      id: 4,
      title: "Library Hours Extended",
      content: "The campus library will be open 24/7 during the final examination period (March 20-30). Additional study spaces and resources will be available.",
      category: "academic",
      priority: "normal",
      author: "Library Administration",
      authorImage: "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1600",
      date: "2024-03-06",
      time: "10:00 AM",
      pinned: false,
      views: 1034,
    },
    {
      id: 5,
      title: "Career Fair 2024 - Company List",
      content: "The list of companies participating in Career Fair 2024 has been updated. Over 50 companies from various industries will be present. Check the career portal for details.",
      category: "academic",
      priority: "high",
      author: "Career Services",
      authorImage: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600",
      date: "2024-03-05",
      time: "03:45 PM",
      pinned: false,
      views: 1789,
    },
    {
      id: 6,
      title: "New Parking Regulations",
      content: "New parking regulations are now in effect. All vehicles must display valid parking permits. Unauthorized vehicles will be towed at owner's expense.",
      category: "general",
      priority: "urgent",
      author: "Campus Security",
      authorImage: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1600",
      date: "2024-03-04",
      time: "08:30 AM",
      pinned: true,
      views: 956,
    },
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory || 
                           (selectedCategory === "urgent" && announcement.priority === "urgent");
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent":
        return <PriorityHighIcon style={{ color: "#ef4444" }} />;
      case "high":
        return <PriorityHighIcon style={{ color: "#f59e0b" }} />;
      default:
        return <InfoIcon style={{ color: "#3b82f6" }} />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "academic":
        return <SchoolIcon />;
      case "events":
        return <EventIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <div className="announcements-page">
      <div className="announcements-header">
        <div className="header-content">
          <div className="title-section">
            <h1>
              <AnnouncementIcon className="title-icon" />
              Campus Announcements
            </h1>
            <p>Stay updated with important campus news and announcements</p>
          </div>
        </div>
      </div>

      <div className="announcements-container">
        <div className="announcements-filters">
          <div className="search-section">
            <div className="search-bar">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <span className="count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="announcements-list">
          {filteredAnnouncements.map(announcement => (
            <div key={announcement.id} className={`announcement-card ${announcement.pinned ? 'pinned' : ''}`}>
              <div className="announcement-header">
                <div className="priority-badge">
                  {getPriorityIcon(announcement.priority)}
                </div>
                <div className="category-badge">
                  {getCategoryIcon(announcement.category)}
                  <span>{announcement.category}</span>
                </div>
                {announcement.pinned && (
                  <div className="pinned-badge">
                    📌 Pinned
                  </div>
                )}
              </div>
              
              <div className="announcement-content">
                <h3>{announcement.title}</h3>
                <p>{announcement.content}</p>
              </div>
              
              <div className="announcement-footer">
                <div className="author-info">
                  <img src={announcement.authorImage} alt={announcement.author} />
                  <div className="author-details">
                    <span className="author-name">{announcement.author}</span>
                    <span className="publish-time">{announcement.date} at {announcement.time}</span>
                  </div>
                </div>
                <div className="announcement-stats">
                  <span className="views">{announcement.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements; 