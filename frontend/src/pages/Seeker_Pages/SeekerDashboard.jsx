import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SeekerSidebar from "../../components/SeekerSidebar";
import "../../styles/dashboard.css";

export default function SeekerDashboard() {
    // ── Existing logic – PRESERVED INTACT ────────────────────
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };
    // ─────────────────────────────────────────────────────────

    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchJobs() {
            try {
                setIsLoading(true);
                const response = await axios.get("http://localhost:8080/jobs", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setJobs(response.data.jobs || []);
            } catch (err) {
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchJobs();
    }, []);

    return (
        <div className="dashboard-layout">

            {/* ── Sidebar ───────────────────────────────────── */}
            <SeekerSidebar onLogout={handleLogout} />

            {/* ── Main ──────────────────────────────────────── */}
            <main className="dashboard-main">

                {/* Topbar */}
                <header className="dashboard-topbar">
                    <h1 className="dashboard-topbar__title">Dashboard</h1>
                    <div className="dashboard-topbar__right">
                        <span className="dashboard-topbar__name">Job Seeker</span>
                        <div className="dashboard-topbar__avatar">S</div>
                    </div>
                </header>

                <div className="dashboard-content">

                    {/* Welcome banner */}
                    <div className="dashboard-welcome">
                        <div className="dashboard-welcome__text">
                            <h2>Welcome back, Seeker! 👋</h2>
                            <p>Discover new opportunities and track your applications here.</p>
                        </div>
                        <div className="dashboard-welcome__emoji">🔍</div>
                    </div>

                    {/* Stat cards */}
                    <div className="stat-cards-grid">
                        <div className="stat-card stat-card--blue">
                            <span className="stat-card__icon">🔎</span>
                            <div className="stat-card__value">{isLoading ? "—" : jobs.length}</div>
                            <div className="stat-card__label">Jobs Available</div>
                        </div>
                        <div className="stat-card stat-card--purple">
                            <span className="stat-card__icon">📄</span>
                            <div className="stat-card__value">—</div>
                            <div className="stat-card__label">Applied Jobs</div>
                        </div>
                        <div className="stat-card stat-card--green">
                            <span className="stat-card__icon">✅</span>
                            <div className="stat-card__value">—</div>
                            <div className="stat-card__label">Shortlisted</div>
                        </div>
                        <div className="stat-card stat-card--pink">
                            <span className="stat-card__icon">🔖</span>
                            <div className="stat-card__value">—</div>
                            <div className="stat-card__label">Saved Jobs</div>
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="dashboard-section-header">
                        <h2 className="dashboard-section-title">Quick Actions</h2>
                    </div>
                    <div className="quick-actions-grid">
                        <NavLink to="/seeker/jobs" className="quick-action-card" id="quick-browse-jobs">
                            <div className="quick-action-card__icon-wrap">🔎</div>
                            <span className="quick-action-card__label">Browse All Jobs</span>
                        </NavLink>
                        <NavLink to="/seeker/appliedjobs" className="quick-action-card" id="quick-browse-jobs">
                            <div className="quick-action-card__icon-wrap">📄</div>
                            <span className="quick-action-card__label">My Applications</span>
                        </NavLink>
                    </div>

                    {/* Available jobs */}
                    <div className="dashboard-section-header">
                        <h2 className="dashboard-section-title">Latest Job Openings</h2>
                        <NavLink to="/seeker/jobs" className="dashboard-section-action">
                            Browse all →
                        </NavLink>
                    </div>

                    {isLoading ? (
                        <div className="dashboard-loading">
                            <span className="spinner"></span>
                            Fetching latest job listings...
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-state__icon">🔍</span>
                            <h3 className="empty-state__title">No Jobs Available Yet</h3>
                            <p className="empty-state__subtitle">
                                Check back soon — new opportunities are added daily.
                            </p>
                        </div>
                    ) : (
                        <div className="job-cards-grid">
                            {jobs.slice(0, 6).map((job) => (
                                <div key={job._id} className="job-card">
                                    <div className="job-card__header">
                                        <div className="job-card__logo">🏢</div>
                                        <span className="job-card__badge">Open</span>
                                    </div>
                                    <h3 className="job-card__title">{job.title}</h3>
                                    <p className="job-card__company">{job.company}</p>
                                    <div className="job-card__meta">
                                        <span className="job-card__meta-item">📍 {job.location}</span>
                                    </div>
                                    {job.skills && job.skills.length > 0 && (
                                        <div className="job-card__skills">
                                            {job.skills.slice(0, 3).map((skill, i) => (
                                                <span key={i} className="job-card__skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="job-card__footer">
                                        <div>
                                            <div className="job-card__salary">
                                                ₹{job.salary ? job.salary.toLocaleString() : "N/A"}
                                            </div>
                                            <div className="job-card__salary-label">per year</div>
                                        </div>
                                        <NavLink to="/seeker/jobs" className="btn-apply">
                                            Apply Now
                                        </NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
