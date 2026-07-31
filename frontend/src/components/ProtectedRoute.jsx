import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    // User is not logged in
    if (!token) {
        return <Navigate to="/login" />;
    }

    // User has wrong role
    if (role !== userRole) {
        return <Navigate to="/login" />;
    }

    // User is authorized
    return children;
}

export default ProtectedRoute;