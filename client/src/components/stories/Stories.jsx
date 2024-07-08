import React from 'react'
import "./stories.scss"
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'
const Stories = () => {
    const {currentUser} = useContext(AuthContext)
    // temp data for future we will use API
    const stories = [
        {
            id:1,
            name: "Thala",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgZ7QuYx_-NEVsJJoXdse61-alHjvmSk_ww&s"
        },
        {
            id:2,
            name: "Kohli",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgZ7QuYx_-NEVsJJoXdse61-alHjvmSk_ww&s"
        },
        {
            id:3,
            name: "Rohit",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgZ7QuYx_-NEVsJJoXdse61-alHjvmSk_ww&s"
        },
        {
            id:4,
            name: "Gautam",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgZ7QuYx_-NEVsJJoXdse61-alHjvmSk_ww&s"
        },
        {
            id:5,
            name: "Bhuvi",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgZ7QuYx_-NEVsJJoXdse61-alHjvmSk_ww&s"
        }
    ]
  return (
    <div className="stories">
      <div className="story">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories