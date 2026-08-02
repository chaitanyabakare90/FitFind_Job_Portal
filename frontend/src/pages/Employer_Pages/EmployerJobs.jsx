import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EmployerSidebar from "../../components/EmployerSidebar";
import "../../styles/dashboard.css";

// ── Existing logic – PRESERVED INTACT ────────────────────────
export default function GetJobs() {
    const [jobs, setJobs] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8080/employer/jobs",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setJobs(response.data.jobs);
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData();
    }, [])
    // ─────────────────────────────────────────────────────────

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="dashboard-layout">

            {/* ── Sidebar ───────────────────────────────────── */}
            <EmployerSidebar onLogout={handleLogout} />

            {/* ── Main ──────────────────────────────────────── */}
            <main className="dashboard-main">

                {/* Topbar */}
                <header className="dashboard-topbar">
                    <h1 className="dashboard-topbar__title">Manage Jobs</h1>
                    <div className="dashboard-topbar__right">
                        <span className="dashboard-topbar__name">Employer</span>
                        <div className="dashboard-topbar__avatar">E</div>
                    </div>
                </header>

                <div className="dashboard-content">

                    {/* Page header */}
                    <div className="page-header">
                        <h2 className="page-header__title">Your Job Listings</h2>
                        <p className="page-header__subtitle">
                            All jobs you have posted. View applicants for each listing.
                        </p>
                    </div>

                    {/* Jobs grid */}
                    {jobs === null ? (
                        <div className="dashboard-loading">
                            <span className="spinner"></span>
                            Loading your job listings...
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-state__icon">📭</span>
                            <h3 className="empty-state__title">No Job Listings Found</h3>
                            <p className="empty-state__subtitle">
                                You haven't posted any jobs yet. Get started now.
                            </p>
                            <Link to="/employer/create_jobs" className="btn-primary">
                                ➕ Post a Job
                            </Link>
                        </div>
                    ) : (
                        <div className="job-cards-grid">
                            {jobs.map((job) => (
                                <div key={job._id} className="job-card">
                                    <div className="job-card__header">
                                        <div className="job-card__logo">💼</div>
                                        <span className="job-card__badge">Active</span>
                                    </div>

                                    <h3 className="job-card__title">{job.title}</h3>
                                    <p className="job-card__company">{job.company}</p>

                                    <div className="job-card__meta">
                                        <span className="job-card__meta-item">📍 {job.location}</span>
                                    </div>

                                    {job.skills && job.skills.length > 0 && (
                                        <div className="job-card__skills">
                                            {job.skills.slice(0, 4).map((skill, i) => (
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
                                        <Link
                                            to={`/view-applicants/${job._id}`}
                                            className="btn-view-applicants"
                                        >
                                            👥 View Applicants
                                        </Link>
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