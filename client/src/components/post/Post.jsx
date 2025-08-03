import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import "./post.scss";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(12);
  const [showMenu, setShowMenu] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const reactions = [
    { icon: <ThumbUpOutlinedIcon />, name: "Like", color: "#1877f2" },
    { icon: <SentimentSatisfiedOutlinedIcon />, name: "Love", color: "#e41e3f" },
    { icon: <EmojiEmotionsOutlinedIcon />, name: "Haha", color: "#f7b928" },
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    setSelectedReaction(liked ? null : "Like");
  };

  const handleReaction = (reaction) => {
    if (selectedReaction === reaction.name) {
      setSelectedReaction(null);
      setLikesCount(likesCount - 1);
    } else {
      setSelectedReaction(reaction.name);
      setLikesCount(likesCount + 1);
    }
    setShowReactions(false);
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: post.name,
        text: post.desc,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          post.desc
        )}&url=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, "_blank");
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // Here you would typically make an API call to save/unsave the post
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt={post.name} />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{formatDistanceToNow(new Date(), { addSuffix: true })}</span>
            </div>
          </div>
          <div className="menu-container">
            <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
              <MoreHorizIcon />
            </button>
            {showMenu && (
              <div className="menu">
                <button className="menu-item">Report</button>
                <button className="menu-item">Hide</button>
                <button className="menu-item">Save to Collection</button>
              </div>
            )}
          </div>
        </div>
        <div className="content">
          {post.category && (
            <div className="category">
              <span>{post.category}</span>
            </div>
          )}
          <p>{post.desc}</p>
          {post.img && (
            <div className="image-container">
              <img src={post.img} alt="Post content" loading="lazy" />
            </div>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="info">
          <div className="reactions-container">
            <button 
              className={`item ${selectedReaction ? 'active' : ''}`} 
              onClick={handleLike}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              {selectedReaction ? (
                <FavoriteOutlinedIcon className="liked" />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
              <span>{likesCount} {selectedReaction || 'Likes'}</span>
            </button>
            {showReactions && (
              <div className="reactions-picker">
                {reactions.map((reaction) => (
                  <button
                    key={reaction.name}
                    className="reaction"
                    onClick={() => handleReaction(reaction)}
                    style={{ color: reaction.color }}
                  >
                    {reaction.icon}
                    <span>{reaction.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <span>Comments</span>
          </button>
          <button className="item" onClick={handleShare}>
            <ShareOutlinedIcon />
            <span>Share</span>
          </button>
          <button className="item bookmark" onClick={handleBookmark}>
            {bookmarked ? (
              <BookmarkOutlinedIcon className="bookmarked" />
            ) : (
              <BookmarkBorderOutlinedIcon />
            )}
            <span>{bookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;