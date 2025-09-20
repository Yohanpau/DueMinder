import { Navigate } from 'react-router-dom';
//This prevents users from accessing home just by typing "/home"
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('authenticatedUser');
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;