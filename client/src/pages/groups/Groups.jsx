import { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedIcon from "@mui/icons-material/Verified";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import "./groups.scss";

const Groups = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Groups", count: 45 },
    { id: "academic", name: "Academic", count: 15 },
    { id: "cultural", name: "Cultural", count: 12 },
    { id: "sports", name: "Sports", count: 8 },
    { id: "tech", name: "Technology", count: 10 },
  ];

  const groups = [
    {
      id: 1,
      name: "Computer Science Society",
      category: "tech",
      description: "A community for CS students to share knowledge, participate in coding challenges, and collaborate on projects.",
      image: "https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=1600",
      members: 324,
      type: "public",
      verified: true,
      featured: true,
      recent_activity: "2 hours ago",
      admin: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      name: "Cultural Heritage Club",
      category: "cultural",
      description: "Celebrating diverse cultures through events, performances, and cultural exchange programs.",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1600",
      members: 567,
      type: "public",
      verified: true,
      featured: true,
      recent_activity: "5 hours ago",
      admin: "Maria Rodriguez",
    },
    {
      id: 3,
      name: "Basketball Team",
      category: "sports",
      description: "Official campus basketball team. Join us for practice sessions, tournaments, and team building activities.",
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1600",
      members: 45,
      type: "private",
      verified: true,
      featured: false,
      recent_activity: "1 day ago",
      admin: "Coach Mike Wilson",
    },
    {
      id: 4,
      name: "Study Group - Data Structures",
      category: "academic",
      description: "Weekly study sessions for Data Structures and Algorithms. Perfect for exam preparation and concept clarity.",
      image: "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1600",
      members: 89,
      type: "public",
      verified: false,
      featured: false,
      recent_activity: "3 hours ago",
      admin: "Alex Chen",
    },
    {
      id: 5,
      name: "Photography Club",
      category: "cultural",
      description: "For photography enthusiasts to share techniques, organize photo walks, and showcase campus life.",
      image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1600",
      members: 156,
      type: "public",
      verified: false,
      featured: false,
      recent_activity: "6 hours ago",
      admin: "Emma Davis",
    },
    {
      id: 6,
      name: "Robotics Club",
      category: "tech",
      description: "Building robots, participating in competitions, and exploring the future of automation and AI.",
      image: "https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=1600",
      members: 78,
      type: "public",
      verified: true,
      featured: false,
      recent_activity: "4 hours ago",
      admin: "Prof. David Kim",
    },
  ];

  const filteredGroups = groups.filter(group => {
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinGroup = (groupId) => {
    console.log(`Joining group: ${groupId}`);
  };

  return (
    <div className="groups-page">
      <div className="groups-header">
        <div className="header-content">
          <div className="title-section">
            <h1>
              <GroupsIcon className="title-icon" />
              Student Groups
            </h1>
            <p>Connect with like-minded students and build your campus community</p>
          </div>
          <button className="create-group-btn">
            <AddIcon />
            Create Group
          </button>
        </div>
      </div>

      <div className="groups-container">
        <div className="groups-filters">
          <div className="search-section">
            <div className="search-bar">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search groups..."
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

        <div className="featured-groups">
          <h2>Featured Groups</h2>
          <div className="featured-grid">
            {filteredGroups.filter(group => group.featured).map(group => (
              <div key={group.id} className="featured-group-card">
                <div className="group-image">
                  <img src={group.image} alt={group.name} />
                  <div className="group-badges">
                    {group.verified && <VerifiedIcon className="verified-badge" />}
                    {group.type === "public" ? (
                      <PublicIcon className="type-badge" />
                    ) : (
                      <LockIcon className="type-badge" />
                    )}
                  </div>
                </div>
                <div className="group-info">
                  <h3>{group.name}</h3>
                  <p className="group-description">{group.description}</p>
                  <div className="group-stats">
                    <div className="stat">
                      <PeopleIcon />
                      <span>{group.members} members</span>
                    </div>
                    <div className="stat">
                      <span className="activity">Active {group.recent_activity}</span>
                    </div>
                  </div>
                  <div className="group-admin">
                    <span>Admin: {group.admin}</span>
                  </div>
                  <div className="group-actions">
                    <button className="join-btn" onClick={() => handleJoinGroup(group.id)}>
                      Join Group
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="all-groups">
          <h2>All Groups</h2>
          <div className="groups-grid">
            {filteredGroups.map(group => (
              <div key={group.id} className="group-card">
                <div className="group-image">
                  <img src={group.image} alt={group.name} />
                  <div className="group-badges">
                    {group.verified && <VerifiedIcon className="verified-badge" />}
                    {group.type === "public" ? (
                      <PublicIcon className="type-badge" />
                    ) : (
                      <LockIcon className="type-badge" />
                    )}
                  </div>
                </div>
                <div className="group-content">
                  <h3>{group.name}</h3>
                  <p className="group-description">{group.description}</p>
                  <div className="group-meta">
                    <div className="meta-item">
                      <PeopleIcon />
                      <span>{group.members} members</span>
                    </div>
                    <div className="meta-item">
                      <span className="activity">Active {group.recent_activity}</span>
                    </div>
                  </div>
                  <div className="group-footer">
                    <span className="admin">by {group.admin}</span>
                    <button className="join-btn" onClick={() => handleJoinGroup(group.id)}>
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

export default Groups; 