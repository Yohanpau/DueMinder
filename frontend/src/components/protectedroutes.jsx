import { Navigate } from 'react-router-dom';
//This prevents users from accessing home just by typing "/home"
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('authenticatedUser');
    return isAuthenticated ? children : <Navigate to="/" />;
};

const token = localStorage.getItem("token");

const response = await fetch("http://localhost:3000/bills", {
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});

export default ProtectedRoute;