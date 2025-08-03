import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { formatDistanceToNow } from "date-fns";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const commentInputRef = useRef(null);

  //Temporary
  const [comments, setComments] = useState([
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      likes: 5,
      liked: false,
      replies: [
        {
          id: 3,
          desc: "This is a reply to the first comment",
          name: "Jane Doe",
          userId: 2,
          profilePicture:
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
          createdAt: new Date(Date.now() - 1800000),
          likes: 2,
          liked: false,
        },
      ],
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      likes: 3,
      liked: false,
      replies: [],
    },
  ]);

  // Temporary users for mentions
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Alice Smith" },
    { id: 4, name: "Bob Johnson" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      desc: commentText,
      name: currentUser.name,
      userId: currentUser.id,
      profilePicture: currentUser.profilePic,
      createdAt: new Date(),
      likes: 0,
      liked: false,
      replies: [],
    };

    if (replyTo) {
      setComments(
        comments.map((comment) =>
          comment.id === replyTo.id
            ? { ...comment, replies: [...comment.replies, newComment] }
            : comment
        )
      );
      setReplyTo(null);
    } else {
      setComments([newComment, ...comments]);
    }
    setCommentText("");
  };

  const handleDeleteComment = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.filter((reply) => reply.id !== commentId),
              }
            : comment
        )
      );
    } else {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditText(comment.desc);
  };

  const handleSaveEdit = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId ? { ...reply, desc: editText } : reply
                ),
              }
            : comment
        )
      );
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, desc: editText } : comment
        )
      );
    }
    setEditingComment(null);
    setEditText("");
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        liked: !reply.liked,
                        likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                      }
                    : reply
                ),
              }
            : comment
        )
      );
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                liked: !comment.liked,
                likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              }
            : comment
        )
      );
    }
  };

  const handleMention = (user) => {
    const mention = `@${user.name} `;
    setCommentText((prev) => prev + mention);
    setShowMentions(false);
    setMentionSearch("");
    commentInputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const renderComment = (comment, isReply = false, parentId = null) => (
    <div className="comment" key={comment.id}>
      <img src={comment.profilePicture} alt={comment.name} />
      <div className="info">
        <div className="header">
          <span className="name">{comment.name}</span>
          {comment.userId === currentUser.id && (
            <div className="actions">
              <button
                className="edit"
                onClick={() => handleEditComment(comment)}
              >
                <EditIcon />
              </button>
              <button
                className="delete"
                onClick={() => handleDeleteComment(comment.id, isReply, parentId)}
              >
                <DeleteOutlineIcon />
              </button>
            </div>
          )}
        </div>
        {editingComment === comment.id ? (
          <div className="edit-form">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={() => handleSaveEdit(comment.id, isReply, parentId)}>
              Save
            </button>
            <button onClick={() => setEditingComment(null)}>Cancel</button>
          </div>
        ) : (
          <p>{comment.desc}</p>
        )}
        <div className="comment-actions">
          <button
            className={`like ${comment.liked ? "liked" : ""}`}
            onClick={() => handleLikeComment(comment.id, isReply, parentId)}
          >
            {comment.liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            <span>{comment.likes}</span>
          </button>
          {!isReply && (
            <button
              className="reply"
              onClick={() => setReplyTo(comment)}
            >
              <ReplyIcon />
              <span>Reply</span>
            </button>
          )}
        </div>
        {!isReply && comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {comment.replies.map((reply) =>
              renderComment(reply, true, comment.id)
            )}
          </div>
        )}
      </div>
      <span className="date">
        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
      </span>
    </div>
  );

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt={currentUser.name} />
        <div className="input-container">
          <input
            ref={commentInputRef}
            type="text"
            placeholder={
              replyTo
                ? `Reply to ${replyTo.name}...`
                : "Write a comment..."
            }
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              if (e.target.value.includes("@")) {
                setShowMentions(true);
                setMentionSearch(
                  e.target.value.split("@").pop().split(" ")[0]
                );
              } else {
                setShowMentions(false);
              }
            }}
            onKeyPress={handleKeyPress}
          />
          {showMentions && filteredUsers.length > 0 && (
            <div className="mentions-list">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  className="mention-item"
                  onClick={() => handleMention(user)}
                >
                  {user.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleAddComment}>
          <SendIcon />
        </button>
      </div>
      {replyTo && (
        <div className="reply-preview">
          Replying to <span>{replyTo.name}</span>
          <button onClick={() => setReplyTo(null)}>Cancel</button>
        </div>
      )}
      {comments.map((comment) => renderComment(comment))}
    </div>
  );
};

export default Comments;