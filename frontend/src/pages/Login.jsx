import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "../styles/Login.css"

export default function Login() {
    let [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    let [error, setError] = useState("");
    let [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    let handleInputChange = (event) => {
        setError("");
        setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        })
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:8080/login", formData);
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            setFormData({ email: "", password: "" });
            if(response.data.user.role === "employer"){
                navigate("/employer/dashboard");
            }else{
                navigate("/seeker/dashboard");
            }
        } catch (err) {
            console.log(err.message);
            const msg = err.response?.data?.message || "Login failed. Please try again.";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-page">

            {/* Decorative background blobs */}
            <div className="auth-blob auth-blob--purple"></div>
            <div className="auth-blob auth-blob--indigo"></div>

            <div className="auth-card">

                {/* Card header */}
                <div className="auth-header">
                    <div className="auth-logo">🔐</div>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to your FitFind account</p>
                </div>

                {/* Error banner */}
                {error && (
                    <div className="auth-error-banner">
                        <span className="auth-error-banner__icon">⚠️</span>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="auth-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label" htmlFor="Email">Email Address</label>
                        <input
                            className="form-input"
                            type="email"
                            value={formData.email}
                            id="Email"
                            name="email"
                            placeholder="you@example.com"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="Password">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            value={formData.password}
                            id="Password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button
                        className={`auth-submit-btn ${isLoading ? "auth-submit-btn--loading" : ""}`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="auth-spinner"></span>
                                Signing In...
                            </>
                        ) : "Sign In"}
                    </button>

                </form>

                {/* Footer links */}
                <div className="auth-footer">
                    <p className="auth-footer__text">
                        Don't have an account?{" "}
                        <Link className="auth-footer__link" to="/signup/seeker">Sign up as Seeker</Link>
                        {" "}or{" "}
                        <Link className="auth-footer__link" to="/signup/employeer">Sign up as Employer</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}