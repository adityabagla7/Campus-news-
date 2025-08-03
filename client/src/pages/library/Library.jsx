import { useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import WifiIcon from "@mui/icons-material/Wifi";
import ComputerIcon from "@mui/icons-material/Computer";
import "./library.scss";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Resources", count: 12456 },
    { id: "books", name: "Books", count: 8234 },
    { id: "journals", name: "Journals", count: 2341 },
    { id: "digital", name: "Digital", count: 1567 },
    { id: "research", name: "Research", count: 314 },
  ];

  const resources = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      author: "Robert Sedgewick",
      type: "Book",
      category: "books",
      available: true,
      location: "Second Floor - Section CS",
      isbn: "978-0321573513",
      rating: 4.5,
      copies: 12,
      available_copies: 8,
    },
    {
      id: 2,
      title: "Nature - International Journal of Science",
      author: "Nature Publishing Group",
      type: "Journal",
      category: "journals",
      available: true,
      location: "Digital Access Only",
      issn: "0028-0836",
      rating: 4.8,
      copies: 1,
      available_copies: 1,
    },
    {
      id: 3,
      title: "Machine Learning Research Papers",
      author: "Various Authors",
      type: "Digital Collection",
      category: "digital",
      available: true,
      location: "Digital Library",
      doi: "10.1000/182",
      rating: 4.3,
      copies: 1,
      available_copies: 1,
    },
    {
      id: 4,
      title: "Advanced Mathematics for Engineers",
      author: "Dennis G. Zill",
      type: "Book",
      category: "books",
      available: false,
      location: "Third Floor - Section MATH",
      isbn: "978-1449679897",
      rating: 4.2,
      copies: 5,
      available_copies: 0,
    },
  ];

  const studyRooms = [
    {
      id: 1,
      name: "Study Room A",
      capacity: 4,
      facilities: ["Whiteboard", "WiFi", "Power Outlets"],
      available: true,
      next_booking: "2:00 PM",
    },
    {
      id: 2,
      name: "Study Room B",
      capacity: 8,
      facilities: ["Projector", "WiFi", "Conference Table"],
      available: false,
      next_booking: "4:00 PM",
    },
    {
      id: 3,
      name: "Silent Study Pod",
      capacity: 2,
      facilities: ["Individual Desks", "WiFi", "Privacy Screen"],
      available: true,
      next_booking: "Next Day",
    },
  ];

  const libraryHours = {
    monday: "8:00 AM - 10:00 PM",
    tuesday: "8:00 AM - 10:00 PM",
    wednesday: "8:00 AM - 10:00 PM",
    thursday: "8:00 AM - 10:00 PM",
    friday: "8:00 AM - 8:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "12:00 PM - 8:00 PM",
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="library-page">
      <div className="library-header">
        <div className="header-content">
          <div className="title-section">
            <h1>
              <LibraryBooksIcon className="title-icon" />
              Campus Library
            </h1>
            <p>Your gateway to knowledge and research resources</p>
          </div>
          <div className="library-status">
            <div className="status-item">
              <AccessTimeIcon />
              <span>Open until 10:00 PM</span>
            </div>
            <div className="status-item">
              <EventSeatIcon />
              <span>42 seats available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="library-container">
        <div className="library-search">
          <div className="search-section">
            <div className="search-bar">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search books, journals, digital resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <span className="count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="library-content">
          <div className="main-section">
            <div className="resources-section">
              <h2>📚 Library Catalog</h2>
              <div className="resources-grid">
                {filteredResources.map(resource => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-header">
                      <div className="resource-type">{resource.type}</div>
                      <div className={`availability-badge ${resource.available ? 'available' : 'unavailable'}`}>
                        {resource.available ? 'Available' : 'Checked Out'}
                      </div>
                    </div>
                    <div className="resource-content">
                      <h3>{resource.title}</h3>
                      <p className="author">by {resource.author}</p>
                      <div className="resource-meta">
                        <div className="meta-item">
                          <span className="label">Location:</span>
                          <span className="value">{resource.location}</span>
                        </div>
                        <div className="meta-item">
                          <span className="label">Copies:</span>
                          <span className="value">{resource.available_copies}/{resource.copies}</span>
                        </div>
                        <div className="rating">
                          <span className="stars">⭐</span>
                          <span className="rating-value">{resource.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="resource-actions">
                      <button className={`action-btn ${resource.available ? 'primary' : 'disabled'}`}>
                        {resource.available ? 'Reserve' : 'Join Waitlist'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="study-rooms">
              <h3>🏠 Study Rooms</h3>
              <div className="rooms-list">
                {studyRooms.map(room => (
                  <div key={room.id} className="room-card">
                    <div className="room-header">
                      <h4>{room.name}</h4>
                      <span className={`status ${room.available ? 'available' : 'occupied'}`}>
                        {room.available ? 'Available' : 'Occupied'}
                      </span>
                    </div>
                    <div className="room-info">
                      <div className="capacity">
                        <PersonIcon />
                        <span>{room.capacity} people</span>
                      </div>
                      <div className="facilities">
                        {room.facilities.map((facility, index) => (
                          <span key={index} className="facility-tag">{facility}</span>
                        ))}
                      </div>
                      <div className="next-booking">
                        Next available: {room.next_booking}
                      </div>
                    </div>
                    <button className={`book-btn ${room.available ? 'available' : 'disabled'}`}>
                      {room.available ? 'Book Now' : 'Join Queue'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="library-hours">
              <h3>🕐 Library Hours</h3>
              <div className="hours-list">
                {Object.entries(libraryHours).map(([day, hours]) => (
                  <div key={day} className="hours-item">
                    <span className="day">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    <span className="time">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-stats">
              <h3>📊 Quick Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <MenuBookIcon />
                  <div className="stat-info">
                    <span className="stat-value">12,456</span>
                    <span className="stat-label">Total Books</span>
                  </div>
                </div>
                <div className="stat-item">
                  <ComputerIcon />
                  <div className="stat-info">
                    <span className="stat-value">24</span>
                    <span className="stat-label">Computers</span>
                  </div>
                </div>
                <div className="stat-item">
                  <WifiIcon />
                  <div className="stat-info">
                    <span className="stat-value">156</span>
                    <span className="stat-label">WiFi Users</span>
                  </div>
                </div>
                <div className="stat-item">
                  <EventSeatIcon />
                  <div className="stat-info">
                    <span className="stat-value">42</span>
                    <span className="stat-label">Free Seats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library; 