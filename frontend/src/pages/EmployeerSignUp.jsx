import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "../styles/EmployeerSignUp.css"

export default function EmployeerSignUp() {
    let [formData, setFormData] = useState({
        companyName: "",
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
            // Backend expects "name" field — sending companyName as name
            const response = await axios.post("http://localhost:8080/signup/employer", {
                name: formData.companyName,
                email: formData.email,
                password: formData.password
            });
            console.log(response.data);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role", response.data.user.role);
            setSuccessMsg("Company account created! Redirecting...");
            setFormData({ companyName: "", email: "", password: "" });
            setTimeout(() => navigate("/employer/dashboard"), 1500);
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
            <div className="auth-blob auth-blob--teal"></div>

            <div className="auth-card">

                {/* Card header */}
                <div className="auth-header">
                    <div className="auth-logo">🏢</div>
                    <h1 className="auth-title">Register Your Company</h1>
                    <p className="auth-subtitle">Start hiring the best talent with FitFind</p>
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
                        <label className="form-label" htmlFor="CompanyName">Company Name</label>
                        <input
                            className="form-input"
                            type="text"
                            value={formData.companyName}
                            id="CompanyName"
                            name="companyName"
                            placeholder="Enter your company name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="Email">Company Email</label>
                        <input
                            className="form-input"
                            type="email"
                            value={formData.email}
                            id="Email"
                            name="email"
                            placeholder="company@example.com"
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
                        ) : "Register Company"}
                    </button>

                </form>

                {/* Footer links */}
                <div className="auth-footer">
                    <p className="auth-footer__text">
                        Already have an account?{" "}
                        <Link className="auth-footer__link" to="/login">Sign In</Link>
                    </p>
                    <p className="auth-footer__text">
                        Looking for a job?{" "}
                        <Link className="auth-footer__link" to="/signup/seeker">Sign up as Seeker</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}