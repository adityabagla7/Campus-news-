import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Events from "./pages/events/Events";
import Groups from "./pages/groups/Groups";
import Announcements from "./pages/announcements/Announcements";
import Library from "./pages/library/Library";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

// Simple placeholder components for pages that don't exist yet
const Gallery = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>📸 Photo Gallery</h1>
    <p>Campus photo gallery coming soon!</p>
  </div>
);

const Messages = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>💬 Messages</h1>
    <p>Campus messaging system coming soon!</p>
  </div>
);

const Academics = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>📚 Academic Resources</h1>
    <p>Academic resources and materials coming soon!</p>
  </div>
);

const Dining = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>🍽️ Campus Dining</h1>
    <p>Dining hall menus and hours coming soon!</p>
  </div>
);

const Sports = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>🏀 Sports & Recreation</h1>
    <p>Sports facilities and activities coming soon!</p>
  </div>
);

const Services = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>🏢 Student Services</h1>
    <p>Student services and support coming soon!</p>
  </div>
);

function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  // For demo purposes, always show the main layout (no login required)
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  // Enhanced router with all pages
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/groups",
          element: <Groups />,
        },
        {
          path: "/announcements",
          element: <Announcements />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/academics",
          element: <Academics />,
        },
        {
          path: "/library",
          element: <Library />,
        },
        {
          path: "/dining",
          element: <Dining />,
        },
        {
          path: "/sports",
          element: <Sports />,
        },
        {
          path: "/services",
          element: <Services />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;