import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "../styles/SeekerSignUp.css"

export default function SeekerSignUp() {
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    let [error, setError] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    let [successMsg, setSuccessMsg] = useState("");

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
        setSuccessMsg("");
        try {
            const response = await axios.post("http://localhost:8080/signup/seeker", formData);
            console.log(response.data);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role", response.data.user.role);
            setSuccessMsg("Account created! Redirecting...");
            setFormData({ name: "", email: "", password: "" });
            setTimeout(() => navigate("/seeker/dashboard"), 1500);
        } catch (err) {
            console.log(err.message);
            const msg = err.response?.data?.message || "Signup failed. Please try again.";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-page">

            {/* Decorative background blobs */}
            <div className="auth-blob auth-blob--purple"></div>
            <div className="auth-blob auth-blob--blue"></div>

            <div className="auth-card">

                {/* Card header */}
                <div className="auth-header">
                    <div className="auth-logo">🔍</div>
                    <h1 className="auth-title">Join as a Job Seeker</h1>
                    <p className="auth-subtitle">Create your account and start finding your perfect fit</p>
                </div>

                {/* Error banner */}
                {error && (
                    <div className="auth-error-banner">
                        <span className="auth-error-banner__icon">⚠️</span>
                        {error}
                    </div>
                )}

                {/* Success banner */}
                {successMsg && (
                    <div className="auth-success-banner">
                        <span className="auth-success-banner__icon">✅</span>
                        {successMsg}
                    </div>
                )}

                {/* Form */}
                <form className="auth-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label" htmlFor="Name">Full Name</label>
                        <input
                            className="form-input"
                            type="text"
                            value={formData.name}
                            id="Name"
                            name="name"
                            placeholder="Enter your full name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

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
                            placeholder="Create a strong password"
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
                                Creating Account...
                            </>
                        ) : "Create Account"}
                    </button>

                </form>

                {/* Footer links */}
                <div className="auth-footer">
                    <p className="auth-footer__text">
                        Already have an account?{" "}
                        <Link className="auth-footer__link" to="/login">Sign In</Link>
                    </p>
                    <p className="auth-footer__text">
                        Are you an employer?{" "}
                        <Link className="auth-footer__link" to="/signup/employeer">Register your company</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}