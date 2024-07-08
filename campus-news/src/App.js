import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import LeftBar from "./components/leftbar/LeftBar";
import Navbar from "./components/navbar/Navbar";
import RightBar from "./components/rightBar/RightBar";
import Home from './pages/home/home';
import Login from "./pages/login/login";
import Profile from './pages/profile/profile';
import Register from "./pages/register/register";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import "./style.scss";
import { AuthContext } from "./context/authContext";
function App() {
  const {darkMode} = useContext(DarkModeContext);
  // const {currUser} = useContext(AuthContext);
  const currUser = true;
  const ProtactedRoute = ({children}) =>{
    if(!currUser){
      return <Navigate to="/login"/>
    }
    return children;
  }
  const Layout = ()=>{
    return(
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar/>
        <div style={{display: "flex"}}>
          <LeftBar/>
          <div style={{flex : 6}}>
          <Outlet/>
          </div>
          <RightBar/>
        </div>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path:"/",
      element: (
      <ProtactedRoute><Layout/>
      </ProtactedRoute>),
      children:[
        {
        path:"/",
        element: <Home/>
      },
      {
        path:"/profile/:id",
        element:<Profile/>
      }]
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