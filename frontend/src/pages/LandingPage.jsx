import { Link } from "react-router-dom"
import "../styles/LandingPage.css"

export default function LandingPage() {
    return (
        <div className="landing-page">

            {/* Decorative background blobs */}
            <div className="landing-blob landing-blob--purple"></div>
            <div className="landing-blob landing-blob--indigo"></div>

            <div className="landing-card">

                {/* Live badge */}
                <div className="landing-badge">
                    <span className="landing-badge__dot"></span>
                    FitFind
                </div>

                {/* Heading */}
                <h1 className="landing-heading">
                    Find Your Perfect<br />
                    <span className="landing-heading__accent">Career Fit</span>
                </h1>

                <p className="landing-subtitle">
                    Whether you're chasing your next opportunity or building your dream team — we've got you covered.
                </p>

                {/* Action buttons */}
                <div className="landing-actions">
                    <Link to="/signup/seeker" className="landing-btn landing-btn--primary">
                        <span className="landing-btn__icon">💼</span>
                        I am Looking For a Job
                    </Link>

                    <Link to="/signup/employeer" className="landing-btn landing-btn--secondary">
                        <span className="landing-btn__icon">🏢</span>
                        I'm Hiring
                    </Link>
                </div>

                {/* Divider */}
                <div className="landing-divider">
                    <span>Already have an account?</span>
                </div>

                {/* Login link */}
                <Link to="/login" className="landing-login-link">
                    Sign In <span className="landing-login-link__arrow">→</span>
                </Link>

            </div>

            <p className="landing-footer">© 2025 FitFind. All rights reserved.</p>
        </div>
    )
}