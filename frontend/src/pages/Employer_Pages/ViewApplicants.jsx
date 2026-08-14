import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import EmployerSidebar from "../../components/EmployerSidebar";
import "../../styles/dashboard.css";
import "../../styles/ViewApplicants.css";

export default function ViewApplicants() {
    // ── Existing logic – PRESERVED INTACT ────────────────────────
    const [applicants, setApplicants] = useState([]);
    const token = localStorage.getItem("token");
    const { jobId } = useParams();

    useEffect(() => {
        async function getApplicants() {
            try {
                const response = await axios.get(`http://localhost:8080/view-applicants/${jobId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setApplicants(response.data.applicants);
            } catch (err) {
                console.log(err.message);
            }
        }
        getApplicants();
    }, [])
    // ─────────────────────────────────────────────────────────────

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
                    <div className="va-topbar-left">
                        <button
                            className="va-back-btn"
                            onClick={() => navigate("/employer/jobs")}
                        >
                            ← Back
                        </button>
                        <h1 className="dashboard-topbar__title">View Applicants</h1>
                    </div>
                    <div className="dashboard-topbar__right">
                        <span className="dashboard-topbar__name">Employer</span>
                        <div className="dashboard-topbar__avatar">E</div>
                    </div>
                </header>

                <div className="dashboard-content">

                    {/* Page header */}
                    <div className="page-header">
                        <h2 className="page-header__title">Job Applicants</h2>
                        <p className="page-header__subtitle">
                            People who have applied to this job listing.
                        </p>
                    </div>

                    {/* Applicant count badge */}
                    {applicants.length > 0 && (
                        <div className="va-count-wrap">
                            <span className="va-count-badge">
                                👥 {applicants.length} Applicant{applicants.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                    )}

                    {/* Loading state */}
                    {applicants === null ? (
                        <div className="dashboard-loading">
                            <span className="spinner"></span>
                            Loading applicants...
                        </div>

                    /* Empty state */
                    ) : applicants.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-state__icon">📭</span>
                            <h3 className="empty-state__title">No Applicants Yet</h3>
                            <p className="empty-state__subtitle">
                                No one has applied to this job listing yet. Check back soon.
                            </p>
                        </div>

                    /* Applicants grid */
                    ) : (
                        <div className="va-grid">
                            {applicants.map((applicant, index) => (
                                <div
                                    key={applicant._id ?? index}
                                    className="job-card va-card"
                                >
                                    {/* Card header */}
                                    <div className="job-card__header va-card__header">
                                        <div className="va-avatar">
                                            {applicant.seeker?.name
                                                ? applicant.seeker.name.charAt(0).toUpperCase()
                                                : "?"}
                                        </div>
                                        <span className="va-applied-badge">Applied</span>
                                    </div>

                                    {/* Name */}
                                    <h3 className="job-card__title va-card__name">
                                        {applicant.seeker?.name ?? "Unknown Applicant"}
                                    </h3>

                                    {/* Email */}
                                    <div className="job-card__meta va-card__email">
                                        <span className="job-card__meta-item">
                                            ✉️ {applicant.seeker?.email ?? "No email provided"}
                                        </span>
                                    </div>
                                                
                                    {/* Footer */}
                                    <div className="va-card__footer">
                                        <span>👤</span>
                                        <span>Job Seeker</span>
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