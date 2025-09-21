import React from "react"; // Enables use of JSX (e.g. <h1>Hi</h1>)
import ReactDOM from "react-dom/client"; //Mounts React app into the real HTML (<div id="root"></div>)
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Handles page navigation
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import SignUp from "./pages/signup.jsx";
import LogIn from "./pages/login.jsx";
import Home from "./pages/dueminder_home.jsx";
import Settings from "./pages/dueminder_settings.jsx";
import ProtectedRoute from "./components/protectedroutes.jsx" //Protecting Routes to be simple typed in by users without Authenticatio. (Home and Setting)
import Profile from "./pages/dueminder_profile.jsx";
import History from "./pages/dueminder_history.jsx";
import "/index.css";

const PageTransition = ({ children }) => (
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);
//Since we don't have app.jsx, we just put this block of code to the main,jsx instead
export default function AnimatedRoutes() { // changed into arrow function insteat of just a function
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <LogIn />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <SignUp />
            </PageTransition>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Home />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Settings />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Profile />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <PageTransition>
                <History />
              </PageTransition>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};


const MainApp = () => (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
)