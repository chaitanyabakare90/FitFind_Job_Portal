import { useNavigate } from "react-router-dom";
import SeekerSidebar from "../../components/SeekerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard.css";
import "../../styles/AppliedJobs.css";


export default function AppliedJobs() {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        async function fetchApplications() {
            try {
                const response = await axios.get("http://localhost:8080/applications",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setAppliedJobs(response.data.applications);
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchApplications();
    }, []);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="dashboard-layout">

            {/* ── Sidebar ───────────────────────────────────── */}
            <SeekerSidebar onLogout={handleLogout} />

            {/* ── Main ──────────────────────────────────────── */}
            <main className="dashboard-main">

                {/* Topbar */}
                <header className="dashboard-topbar">
                    <h1 className="dashboard-topbar__title">Applied Jobs</h1>
                    <div className="dashboard-topbar__right">
                        <span className="dashboard-topbar__name">Job Seeker</span>
                        <div className="dashboard-topbar__avatar">S</div>
                    </div>
                </header>

                <div className="dashboard-content">

                    {/* Page header */}
                    <div className="page-header">
                        <h2 className="page-header__title">My Applications</h2>
                        <p className="page-header__subtitle">
                            Track the status of every job you have applied to.
                        </p>
                    </div>

                    {/* Count badge */}
                    {appliedJobs.length > 0 && (
                        <div className="aj-count-wrap">
                            <span className="aj-count-badge">
                                📋 {appliedJobs.length} Application{appliedJobs.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                    )}

                    {/* Loading */}
                    {appliedJobs === null ? (
                        <div className="dashboard-loading">
                            <span className="spinner"></span>
                            Loading your applications...
                        </div>

                    /* Empty state */
                    ) : appliedJobs.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-state__icon">📭</span>
                            <h3 className="empty-state__title">No Applications Yet</h3>
                            <p className="empty-state__subtitle">
                                You haven't applied to any jobs yet. Browse open positions and apply today!
                            </p>
                        </div>

                    /* Applied jobs grid */
                    ) : (
                        <div className="aj-grid">
                            {appliedJobs.map((appliedJob) => (
                                <div key={appliedJob._id} className="aj-card">

                                    {/* Card header */}
                                    <div className="aj-card__header">
                                        <div className="aj-card__logo">🏢</div>
                                        <span className={`aj-status-pill${
                                            appliedJob.status === "accepted" ? " aj-status--accepted"
                                            : appliedJob.status === "rejected" ? " aj-status--rejected"
                                            : ""
                                        }`}>
                                            {appliedJob.status === "accepted" ? "✓ " : appliedJob.status === "rejected" ? "✕ " : "⏳ "}
                                            {appliedJob.status}
                                        </span>
                                    </div>

                                    {/* Job title & company */}
                                    <h3 className="aj-card__title">{appliedJob.job.title}</h3>
                                    <p className="aj-card__company">{appliedJob.job.company}</p>

                                    {/* Meta: location */}
                                    <div className="aj-card__meta">
                                        <span className="aj-card__meta-item">📍 {appliedJob.job.location}</span>
                                    </div>

                                    {/* Footer: applied date */}
                                    <div className="aj-card__footer">
                                        <span className="aj-card__footer-label">
                                            🗓 Applied {new Date(appliedJob.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>

        </div>
    )
}