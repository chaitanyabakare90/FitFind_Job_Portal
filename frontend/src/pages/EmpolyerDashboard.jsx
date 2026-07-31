import { useNavigate } from "react-router-dom";

export default function EmpolyerDashboard(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");
    };
    
    return (
        <>
            <h1>Welcome Seeker</h1>

            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}