import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EventIcon from "@mui/icons-material/Event";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import "./share.scss";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [postContent, setPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedFile, setSelectedFile] = useState(null);

  const categories = [
    { value: "general", label: "General", icon: <EmojiEmotionsIcon /> },
    { value: "event", label: "Event", icon: <EventIcon /> },
    { value: "announcement", label: "Announcement", icon: <AnnouncementIcon /> },
    { value: "academic", label: "Academic", icon: <PeopleIcon /> },
    { value: "sports", label: "Sports", icon: <PeopleIcon /> },
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() || selectedFile) {
      // Handle post submission here
      console.log("Post submitted:", {
        content: postContent,
        category: selectedCategory,
        file: selectedFile,
      });
      
      // Reset form
      setPostContent("");
      setSelectedFile(null);
      setSelectedCategory("general");
    }
  };

  return (
    <div className="share">
      <div className="share-container">
        <div className="share-header">
          <div className="user-info">
            <img
              src={currentUser.profilePic || "/default-avatar.png"}
              alt={currentUser.name}
              className="user-avatar"
            />
            <div className="user-details">
              <h3>{currentUser.name}</h3>
              <span>Share with your campus community</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="share-form">
          <div className="post-input-container">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={`What's happening on campus, ${currentUser.name}?`}
              className="post-input"
              rows="4"
            />
            
            {selectedFile && (
              <div className="file-preview">
                <div className="file-info">
                  <span className="file-name">{selectedFile.name}</span>
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => setSelectedFile(null)}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="category-selection">
            <label className="category-label">Category:</label>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  className={`category-btn ${
                    selectedCategory === category.value ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="share-actions">
            <div className="action-buttons">
              <input
                type="file"
                id="photo-upload"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              <label htmlFor="photo-upload" className="action-btn">
                <PhotoCameraIcon />
                <span>Photo/Video</span>
              </label>

              <button type="button" className="action-btn">
                <LocationOnIcon />
                <span>Location</span>
              </button>

              <button type="button" className="action-btn">
                <PeopleIcon />
                <span>Tag People</span>
              </button>

              <button type="button" className="action-btn">
                <EmojiEmotionsIcon />
                <span>Feeling</span>
              </button>
            </div>

            <button
              type="submit"
              className="share-btn"
              disabled={!postContent.trim() && !selectedFile}
            >
              Share Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;