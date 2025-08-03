import { useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./rightBar.scss";

const RightBar = () => {
  const [followedTopics] = useState([
    { id: 1, name: "Computer Science", followers: 324 },
    { id: 2, name: "Student Council", followers: 567 },
    { id: 3, name: "Campus Events", followers: 892 },
    { id: 4, name: "Academic Resources", followers: 445 },
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: "Spring Tech Fest",
      date: "March 15, 2024",
      time: "10:00 AM",
      location: "Main Auditorium",
      category: "Technology",
      attendees: 234,
    },
    {
      id: 2,
      title: "Career Fair 2024",
      date: "March 20, 2024",
      time: "9:00 AM",
      location: "Student Center",
      category: "Career",
      attendees: 567,
    },
    {
      id: 3,
      title: "Cultural Night",
      date: "March 25, 2024",
      time: "7:00 PM",
      location: "Campus Ground",
      category: "Cultural",
      attendees: 423,
    },
  ]);

  const [campusAnnouncements] = useState([
    {
      id: 1,
      title: "Library Hours Extended",
      content: "Library will be open 24/7 during finals week starting March 10th.",
      type: "info",
      author: "Library Administration",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "New Parking Rules",
      content: "Updated parking regulations are now in effect. Please check the student portal for details.",
      type: "important",
      author: "Campus Security",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "Student Council Elections",
      content: "Nominations are open for student council positions. Deadline: March 30th.",
      type: "event",
      author: "Student Council",
      time: "1 day ago",
    },
  ]);

  const [trendingTopics] = useState([
    { topic: "#SpringFest2024", posts: 142 },
    { topic: "#CampusLife", posts: 89 },
    { topic: "#StudyTips", posts: 76 },
    { topic: "#CareerFair", posts: 65 },
    { topic: "#TechTalk", posts: 54 },
  ]);

  const [suggestedConnections] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Computer Science Professor",
      image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1600",
      mutualConnections: 5,
    },
    {
      id: 2,
      name: "Alex Chen",
      role: "Student Council President",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600",
      mutualConnections: 8,
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Events Coordinator",
      image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1600",
      mutualConnections: 3,
    },
  ]);

  const getAnnouncementIcon = (type) => {
    switch (type) {
      case "info":
        return <AnnouncementIcon style={{ color: "#3b82f6" }} />;
      case "important":
        return <AnnouncementIcon style={{ color: "#ef4444" }} />;
      case "event":
        return <EventIcon style={{ color: "#10b981" }} />;
      default:
        return <AnnouncementIcon style={{ color: "#6b7280" }} />;
    }
  };

  return (
    <div className="rightBar">
      <div className="rightBar-container">
        {/* Campus Announcements */}
        <div className="widget">
          <div className="widget-header">
            <AnnouncementIcon className="widget-icon" />
            <h3 className="widget-title">Campus Announcements</h3>
          </div>
          <div className="announcements-list">
            {campusAnnouncements.map((announcement) => (
              <div key={announcement.id} className="announcement-item">
                <div className="announcement-header">
                  <div className="announcement-icon">
                    {getAnnouncementIcon(announcement.type)}
                  </div>
                  <div className="announcement-meta">
                    <h4 className="announcement-title">{announcement.title}</h4>
                    <span className="announcement-time">{announcement.time}</span>
                  </div>
                </div>
                <p className="announcement-content">{announcement.content}</p>
                <div className="announcement-footer">
                  <span className="announcement-author">By {announcement.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="widget">
          <div className="widget-header">
            <EventIcon className="widget-icon" />
            <h3 className="widget-title">Upcoming Events</h3>
          </div>
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-category">{event.category}</div>
                <h4 className="event-title">{event.title}</h4>
                <div className="event-details">
                  <div className="event-detail">
                    <CalendarTodayIcon />
                    <span>{event.date}</span>
                  </div>
                  <div className="event-detail">
                    <AccessTimeIcon />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <LocationOnIcon />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="event-footer">
                  <span className="event-attendees">{event.attendees} attending</span>
                  <button className="attend-btn">Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="widget">
          <div className="widget-header">
            <TrendingUpIcon className="widget-icon" />
            <h3 className="widget-title">Trending Topics</h3>
          </div>
          <div className="trending-list">
            {trendingTopics.map((trend, index) => (
              <div key={index} className="trending-item">
                <div className="trending-rank">#{index + 1}</div>
                <div className="trending-content">
                  <span className="trending-topic">{trend.topic}</span>
                  <span className="trending-posts">{trend.posts} posts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Connections */}
        <div className="widget">
          <div className="widget-header">
            <PersonAddIcon className="widget-icon" />
            <h3 className="widget-title">Suggested Connections</h3>
          </div>
          <div className="connections-list">
            {suggestedConnections.map((person) => (
              <div key={person.id} className="connection-item">
                <img
                  src={person.image}
                  alt={person.name}
                  className="connection-image"
                />
                <div className="connection-info">
                  <h4 className="connection-name">{person.name}</h4>
                  <p className="connection-role">{person.role}</p>
                  <span className="mutual-connections">
                    {person.mutualConnections} mutual connections
                  </span>
                </div>
                <button className="connect-btn">Connect</button>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Topics to Follow */}
        <div className="widget">
          <div className="widget-header">
            <h3 className="widget-title">Campus Topics</h3>
          </div>
          <div className="topics-list">
            {followedTopics.map((topic) => (
              <div key={topic.id} className="topic-item">
                <div className="topic-info">
                  <h4 className="topic-name">{topic.name}</h4>
                  <span className="topic-followers">{topic.followers} followers</span>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;