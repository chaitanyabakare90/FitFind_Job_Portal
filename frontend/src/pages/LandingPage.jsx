import { Link } from "react-router-dom"
import heroImg from "../assets/hero.png"
import "../styles/LandingPage.css"

export default function LandingPage() {
    return (
        <div className="landing-page">

            {/* Decorative background blobs */}
            <div className="landing-blob landing-blob--purple"></div>
            <div className="landing-blob landing-blob--indigo"></div>

            {/* ── Navbar ────────────────────────────────────────── */}
            <nav className="landing-nav">
                <div className="landing-nav__brand">
                    <div className="landing-nav__brand-icon"><img src="/favicon.svg" alt="" /></div>
                    <span className="landing-nav__brand-name">FitFind</span>
                </div>
                <div className="landing-nav__links">
                    <Link to="/signup/seeker" className="landing-nav__link">Find Jobs</Link>
                    <Link to="/signup/employeer" className="landing-nav__link">For Employers</Link>
                    <Link to="/login" className="landing-nav__signin">Sign In →</Link>
                </div>
            </nav>

            {/* ── Hero split ────────────────────────────────────── */}
            <section className="landing-hero">

                {/* Left – copy & CTAs */}
                <div className="landing-hero__left">

                    {/* Live badge */}
                    <div className="landing-badge">
                        <span className="landing-badge__dot"></span>
                        #1 Job Portal in India
                    </div>

                    {/* Heading */}
                    <h1 className="landing-heading">
                        Where Talent<br />
                        Meets<br />
                        <span className="landing-heading__accent">Opportunity.</span>
                    </h1>

                    <p className="landing-subtitle">
                        Whether you're chasing your next big role or building your dream team —
                        FitFind connects the right people with the right opportunities, instantly.
                    </p>

                    {/* Stats */}
                    <div className="landing-stats">
                        <div className="landing-stat">
                            <span className="landing-stat__value">10K+</span>
                            <span className="landing-stat__label">Live Jobs</span>
                        </div>
                        <div className="landing-stats-divider"></div>
                        <div className="landing-stat">
                            <span className="landing-stat__value">5K+</span>
                            <span className="landing-stat__label">Companies</span>
                        </div>
                        <div className="landing-stats-divider"></div>
                        <div className="landing-stat">
                            <span className="landing-stat__value">100K+</span>
                            <span className="landing-stat__label">Seekers</span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="landing-actions">
                        <Link to="/signup/seeker" className="landing-btn landing-btn--primary" id="find-jobs-btn">
                            <span className="landing-btn__icon">💼</span>
                            Find Jobs
                        </Link>

                        <Link to="/signup/employeer" className="landing-btn landing-btn--secondary" id="hire-talent-btn">
                            <span className="landing-btn__icon">🏢</span>
                            Hire Talent
                        </Link>
                    </div>

                    {/* Already have account */}
                    <div className="landing-divider">
                        <span>Already have an account?</span>
                    </div>

                    <Link to="/login" className="landing-login-link" id="sign-in-link">
                        Sign In <span className="landing-login-link__arrow">→</span>
                    </Link>
                </div>

                {/* Right – illustration */}
                <div className="landing-hero__right">
                    <div className="landing-hero__img-wrap">
                        <div className="landing-hero__img-glow"></div>
                        <img
                            src={heroImg}
                            alt="Professionals connecting through FitFind job portal"
                            className="landing-hero__img"
                        />
                    </div>
                </div>

            </section>

            {/* ── Trust badges ──────────────────────────────────── */}
            <div className="landing-trust">
                <div className="landing-trust__item"><span>🔒</span> Verified Companies</div>
                <div className="landing-trust__item"><span>⚡</span> Instant Matching</div>
                <div className="landing-trust__item"><span>🎯</span> Smart Fit Score</div>
                <div className="landing-trust__item"><span>🌍</span> Remote & On-site</div>
            </div>

            <p className="landing-footer">© 2025 FitFind. All rights reserved.</p>
        </div>
    )
}