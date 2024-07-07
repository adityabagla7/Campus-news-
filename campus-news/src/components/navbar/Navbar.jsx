import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import React from 'react';
import "./navbar.scss";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="navbar">
    <div className="left">
        <Link to='/' style={{textDecoration:"none"}}>
        <span>BPGC News</span>
        </Link>
        <HomeOutlinedIcon/>
        <DarkModeOutlinedIcon/>
        <GridViewOutlinedIcon/>
        <div className="search">
            <SearchOutlinedIcon/>
            <input type="text" placeholder='Search'/>
        </div>
        <div className="right">
            <PersonOutlinedIcon/>
            <EmailOutlinedIcon/>
            <NotificationsOutlinedIcon/>
            <div className="user">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhqQcmuQmVh3GxwFo3kKlRCkJdDhM9MVxtA&s" alt="" />
            <span>Suman Kundu</span>
        </div>
        </div>
    </div>
  </div>
  )
}

export default Navbar
