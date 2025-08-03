import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  // Campus-specific posts with realistic content
  const posts = [
    {
      id: 1,
      name: "Student Council",
      userId: 1,
      profilePic: "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "📢 Exciting news! Spring Festival 2024 registrations are now open! Join us for three days of music, dance, tech competitions, and cultural events. Don't miss out on this amazing celebration of campus life! 🎉",
      img: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1600",
      timestamp: "2 hours ago",
      likes: 124,
      comments: 18,
      category: "Event",
      isOfficial: true
    },
    {
      id: 2,
      name: "Alex Chen",
      userId: 2,
      profilePic: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Just finished my Computer Science project on AI-powered campus navigation! 🤖 Special thanks to Dr. Johnson for the guidance. The future of campus tech is here! #TechLife #AI #CampusInnovation",
      img: "https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=1600",
      timestamp: "4 hours ago",
      likes: 89,
      comments: 12,
      category: "Academic",
      isOfficial: false
    },
    {
      id: 3,
      name: "Campus Library",
      userId: 3,
      profilePic: "https://images.pexels.com/photos/159844/book-reading-reading-book-girl-159844.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "📚 Extended hours during finals week! The library will be open 24/7 from March 10-17. We've also added more study spaces and charging stations. Good luck with your exams, everyone! 💪",
      img: "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1600",
      timestamp: "6 hours ago",
      likes: 203,
      comments: 31,
      category: "Announcement",
      isOfficial: true
    },
    {
      id: 4,
      name: "Sarah Martinez",
      userId: 4,
      profilePic: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Amazing turnout at today's Career Fair! 🎯 Had great conversations with tech companies and startups. Already got 3 interview callbacks! To fellow students: don't underestimate the power of networking. #CareerFair #Success",
      img: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600",
      timestamp: "8 hours ago",
      likes: 156,
      comments: 24,
      category: "Career",
      isOfficial: false
    },
    {
      id: 5,
      name: "Campus Events Team",
      userId: 5,
      profilePic: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "🎭 Cultural Night auditions are starting next week! Whether you're into music, dance, drama, or poetry - we want you! This is your chance to showcase your talent and represent your culture. Registration link in bio! ✨",
      img: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1600",
      timestamp: "1 day ago",
      likes: 298,
      comments: 45,
      category: "Event",
      isOfficial: true
    },
    {
      id: 6,
      name: "Mike Johnson",
      userId: 6,
      profilePic: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Study group for Advanced Algorithms this weekend! 📖 We'll be covering dynamic programming and graph algorithms. Library room 205, Saturday 2 PM. All CS students welcome! Let's ace that midterm together! 🚀",
      timestamp: "1 day ago",
      likes: 67,
      comments: 15,
      category: "Study",
      isOfficial: false
    },
    {
      id: 7,
      name: "Campus Dining",
      userId: 7,
      profilePic: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "🍕 New menu items this week! Introducing our 'Global Fusion' section with dishes from different cultures. From authentic pasta to spicy Thai curry - there's something for everyone! Come hungry! 🌮🍜",
      img: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600",
      timestamp: "2 days ago",
      likes: 189,
      comments: 22,
      category: "Campus Life",
      isOfficial: true
    }
  ];

  return (
    <div className="posts">
      <div className="posts-header">
        <h2>Campus News Feed</h2>
        <p>Stay updated with the latest campus activities, events, and announcements</p>
      </div>
      <div className="posts-content">
        {posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;