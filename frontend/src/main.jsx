import React from "react"; // Enables use of JSX (e.g. <h1>Hi</h1>)
import ReactDOM from "react-dom/client"; //Mounts React app into the real HTML (<div id="root"></div>)
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Handles page navigation
import SignUp from "./pages/signup.jsx";
import LogIn from "./pages/login.jsx"; 
import Home from "./pages/dueminder_home.jsx"; 
import Settings from "./pages/dueminder_settings.jsx"; 
import Profile from "./pages/dueminder_profile.jsx"; 
import "/index.css";

//Since we don't have app.jsx, we just put this block of code to the main,jsx instead
const MainApp = () => { // changed into arrow function insteat of just a function
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

// Added this block of code because without this nothing will show up on the browser because the components are not being rendered anywhere.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
)
