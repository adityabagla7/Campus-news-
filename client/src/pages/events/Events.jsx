import { useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import "./events.scss";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    { id: "all", name: "All Events", count: 24 },
    { id: "academic", name: "Academic", count: 8 },
    { id: "cultural", name: "Cultural", count: 6 },
    { id: "sports", name: "Sports", count: 4 },
    { id: "tech", name: "Technology", count: 6 },
  ];

  const events = [
    {
      id: 1,
      title: "Spring Tech Fest 2024",
      category: "tech",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Main Auditorium",
      description: "Annual technology festival featuring competitions, workshops, and industry talks.",
      image: "https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=1600",
      attendees: 234,
      organizer: "Tech Society",
      featured: true,
    },
    {
      id: 2,
      title: "Career Fair 2024",
      category: "academic",
      date: "2024-03-20",
      time: "9:00 AM",
      location: "Student Center",
      description: "Connect with top employers and explore career opportunities.",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600",
      attendees: 567,
      organizer: "Career Services",
      featured: true,
    },
    {
      id: 3,
      title: "Cultural Night 2024",
      category: "cultural",
      date: "2024-03-25",
      time: "7:00 PM",
      location: "Campus Ground",
      description: "Celebrate diversity with music, dance, and cultural performances.",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1600",
      attendees: 423,
      organizer: "Cultural Committee",
      featured: false,
    },
    {
      id: 4,
      title: "Inter-College Basketball Tournament",
      category: "sports",
      date: "2024-03-18",
      time: "2:00 PM",
      location: "Sports Complex",
      description: "Exciting basketball matches between colleges.",
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1600",
      attendees: 189,
      organizer: "Sports Committee",
      featured: false,
    },
    {
      id: 5,
      title: "AI & Machine Learning Workshop",
      category: "tech",
      date: "2024-03-22",
      time: "11:00 AM",
      location: "Computer Lab",
      description: "Hands-on workshop on AI and ML with industry experts.",
      image: "https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=1600",
      attendees: 98,
      organizer: "CS Department",
      featured: false,
    },
    {
      id: 6,
      title: "Annual Science Exhibition",
      category: "academic",
      date: "2024-03-28",
      time: "10:00 AM",
      location: "Science Block",
      description: "Showcase of innovative projects and research work.",
      image: "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1600",
      attendees: 156,
      organizer: "Science Department",
      featured: false,
    },
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinEvent = (eventId) => {
    console.log(`Joining event: ${eventId}`);
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <div className="header-content">
          <div className="title-section">
            <h1>
              <EventIcon className="title-icon" />
              Campus Events
            </h1>
            <p>Discover and join exciting events happening on campus</p>
          </div>
          <button className="create-event-btn">
            <AddIcon />
            Create Event
          </button>
        </div>
      </div>

      <div className="events-container">
        <div className="events-filters">
          <div className="search-section">
            <div className="search-bar">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search events..."
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

        <div className="featured-events">
          <h2>Featured Events</h2>
          <div className="featured-grid">
            {filteredEvents.filter(event => event.featured).map(event => (
              <div key={event.id} className="featured-event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-category">{event.category}</div>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <div className="event-details">
                    <div className="detail-item">
                      <CalendarTodayIcon />
                      <span>{event.date}</span>
                    </div>
                    <div className="detail-item">
                      <AccessTimeIcon />
                      <span>{event.time}</span>
                    </div>
                    <div className="detail-item">
                      <LocationOnIcon />
                      <span>{event.location}</span>
                    </div>
                    <div className="detail-item">
                      <PeopleIcon />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <div className="event-actions">
                    <span className="organizer">by {event.organizer}</span>
                    <button className="join-btn" onClick={() => handleJoinEvent(event.id)}>
                      Join Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="all-events">
          <h2>All Events</h2>
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-category">{event.category}</div>
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta">
                    <div className="meta-item">
                      <CalendarTodayIcon />
                      <span>{event.date}</span>
                    </div>
                    <div className="meta-item">
                      <AccessTimeIcon />
                      <span>{event.time}</span>
                    </div>
                    <div className="meta-item">
                      <LocationOnIcon />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="event-footer">
                    <div className="attendees">
                      <PeopleIcon />
                      <span>{event.attendees} going</span>
                    </div>
                    <button className="join-btn" onClick={() => handleJoinEvent(event.id)}>
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events; 