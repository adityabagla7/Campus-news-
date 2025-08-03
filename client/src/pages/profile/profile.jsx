import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./profile.scss";

const Profile = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [inputs, setInputs] = useState({
    name: currentUser?.name || "",
    bio: currentUser?.bio || "",
    email: currentUser?.email || "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type
      const fileType = selectedFile.type;
      if (!fileType.match(/^image\/(jpeg|jpg|png|gif)$/)) {
        setError("Please select a valid image file (JPEG, PNG, or GIF)");
        return;
      }
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }
      
      setFile(selectedFile);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setInputs(prev => ({
        ...prev,
        profilePic: previewUrl // This is just for preview, not the actual upload
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!currentUser) {
      setError("You are not authenticated");
      setLoading(false);
      return;
    }

    try {
      let profilePic = currentUser.profilePic;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const uploadRes = await makeRequest.post("upload", formData);
          profilePic = uploadRes.data.url;
        } catch (uploadErr) {
          console.error("Error uploading file:", uploadErr);
          setError("Failed to upload profile picture. Please try again.");
          setLoading(false);
          return;
        }
      }

      const updatedUser = {
        ...inputs,
        profilePic,
      };

      const res = await makeRequest.put(
        `users/${currentUser._id}`,
        updatedUser
      );

      updateUser(res.data);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      if (err.response?.status === 401) {
        setError("You are not authenticated. Please log in again.");
      } else if (err.response?.status === 403) {
        setError("You are not authorized to update this profile.");
      } else {
        setError(err.response?.data?.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="left">
          <div className="profile-card">
            <div className="profile-pic">
              <img
                src={currentUser?.profilePic || "https://via.placeholder.com/150"}
                alt=""
              />
              <div className="upload-overlay">
                <label htmlFor="file">
                  <span className="upload-icon">📷</span>
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <h2>{currentUser?.username}</h2>
            <p className="bio">{currentUser?.bio || "No bio yet"}</p>
            <div className="stats">
              <div className="stat">
                <span className="count">{currentUser?.followers?.length || 0}</span>
                <span className="label">Followers</span>
              </div>
              <div className="stat">
                <span className="count">{currentUser?.following?.length || 0}</span>
                <span className="label">Following</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="edit-profile">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  placeholder="Your email"
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={inputs.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows="4"
                />
              </div>
              {error && <div className="error">{error}</div>}
              {success && <div className="success">{success}</div>}
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;