import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeekerSidebar from "../../components/SeekerSidebar";
import "../../styles/dashboard.css";
import "../../styles/GetJobs.css";

export default function GetJobs() {
    const [jobs, setJobs] = useState([]);
    const [resumeFile, setResumeFile] = useState(null);
    const [isMatching, setIsMatching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [appliedJobIds, setAppliedJobIds] = useState(new Set());
    const [errorMessage, setErrorMessage] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchAllJobs = async () => {
        try {
            setIsLoading(true);
            setErrorMessage("");
            const response = await axios.get("http://localhost:8080/jobs", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setJobs(response.data.jobs || []);
        } catch (err) {
            console.log(err.message);
            setErrorMessage("Failed to load jobs. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllJobs();
    }, []);

    const handleOnClick = async (job_id) => {
        try {
            await axios.post(
                "http://localhost:8080/application",
                { jobId: job_id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setAppliedJobIds((prev) => new Set([...prev, job_id]));
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleOnSubmit = async (event) => {
        try {
            event.preventDefault();

            if (!resumeFile) {
                setErrorMessage("Please select a PDF resume first.");
                return;
            }

            setErrorMessage("");
            setIsMatching(true);

            const formData = new FormData();
            formData.append("resume", resumeFile);

            const response = await axios.post(
                "http://localhost:8080/resume_matching",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data && response.data.jobs) {
                // Sort jobs by matchPercentage descending
                const sortedJobs = [...response.data.jobs].sort((a, b) => {
                    const matchA = a.matchPercentage ?? 0;
                    const matchB = b.matchPercentage ?? 0;
                    return matchB - matchA;
                });
                setJobs(sortedJobs);
            }
        } catch (err) {
            console.log(err.message);
            setErrorMessage("Failed to match resume. Please ensure your PDF is valid and try again.");
        } finally {
            setIsMatching(false);
        }
    };

    const handleOnChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setResumeFile(file);
            setErrorMessage("");
            console.log(file);
        }
    };

    const handleReset = () => {
        setResumeFile(null);
        fetchAllJobs();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const isMatchedView = jobs.some((j) => j.matchPercentage != null);

    return (
        <div className="dashboard-layout">
            {/* ── Sidebar ───────────────────────────────────── */}
            <SeekerSidebar onLogout={handleLogout} />

            {/* ── Main ──────────────────────────────────────── */}
            <main className="dashboard-main">
                {/* Topbar */}
                <header className="dashboard-topbar">
                    <h1 className="dashboard-topbar__title">Browse Jobs</h1>
                    <div className="dashboard-topbar__right">
                        <span className="dashboard-topbar__name">Job Seeker</span>
                        <div className="dashboard-topbar__avatar">S</div>
                    </div>
                </header>

                <div className="dashboard-content">
                    {/* ── Resume Matcher Bar / Banner ────────────── */}
                    <div className="resume-match-banner">
                        <div className="resume-match-banner__header">
                            <div className="resume-match-banner__text">
                                <h2 className="resume-match-banner__title">
                                    Smart Resume Matcher
                                    <span className="resume-match-banner__title-badge">AI Match</span>
                                </h2>
                                <p className="resume-match-banner__tagline">
                                    Upload your resume to discover jobs tailored to your skills and view your personalized compatibility score.
                                </p>
                            </div>
                            <div className="resume-match-banner__icon">🎯</div>
                        </div>

                        {/* Upload & Action Form Bar */}
                        <form className="resume-upload-form" onSubmit={handleOnSubmit}>
                            <input
                                type="file"
                                id="resume-upload-input"
                                className="resume-file-input"
                                accept=".pdf"
                                onChange={handleOnChange}
                            />

                            <label
                                htmlFor="resume-upload-input"
                                className={`resume-file-label ${resumeFile ? "resume-file-label--has-file" : ""}`}
                                title={resumeFile ? resumeFile.name : "Click to select PDF"}
                            >
                                <span>{resumeFile ? "📄" : "📎"}</span>
                                <span className="resume-file-name">
                                    {resumeFile ? resumeFile.name : "Upload Resume (PDF)"}
                                </span>
                            </label>

                            <div className="resume-actions-group">
                                <button
                                    type="submit"
                                    className="btn-match-resume"
                                    disabled={!resumeFile || isMatching}
                                    id="find-matched-jobs-btn"
                                >
                                    {isMatching ? (
                                        <>
                                            <span className="spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }}></span>
                                            <span>Matching with AI...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>⚡</span>
                                            <span>Find Matching Jobs</span>
                                        </>
                                    )}
                                </button>

                                {(isMatchedView || resumeFile) && (
                                    <button
                                        type="button"
                                        className="btn-reset-jobs"
                                        onClick={handleReset}
                                        disabled={isMatching}
                                    >
                                        <span>↺</span>
                                        <span>Show All Jobs</span>
                                    </button>
                                )}
                            </div>
                        </form>

                        {errorMessage && (
                            <div style={{ marginTop: "0.85rem", color: "#f87171", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                                <span>⚠️</span> {errorMessage}
                            </div>
                        )}
                    </div>

                    {/* ── Matched Results Notification Bar ───────── */}
                    {isMatchedView && !isMatching && (
                        <div className="matched-results-bar">
                            <div className="matched-results-info">
                                <span>🎯</span>
                                <span>Showing AI-Matched Jobs sorted by compatibility</span>
                                <span className="matched-results-count">{jobs.length} Found</span>
                            </div>
                            <button
                                className="dashboard-section-action"
                                onClick={handleReset}
                                style={{ background: "none", border: "none", cursor: "pointer" }}
                            >
                                Clear filter & view all →
                            </button>
                        </div>
                    )}

                    {/* ── AI Matching Loader ─────────────────────── */}
                    {isMatching ? (
                        <div className="matching-loader-card">
                            <div className="matching-loader-pulse">
                                <div className="pulse-ring"></div>
                                <div className="pulse-ring"></div>
                                <div className="matching-loader-icon">🤖</div>
                            </div>
                            <h3 className="matching-loader-title">Scanning Resume & Matching Opportunities...</h3>
                            <p className="matching-loader-subtitle">
                                FitFind AI is extracting your skills, comparing requirements, and calculating compatibility scores.
                            </p>
                            <div className="matching-progress-bar">
                                <div className="matching-progress-indicator"></div>
                            </div>
                        </div>
                    ) : isLoading ? (
                        <div className="dashboard-loading">
                            <span className="spinner"></span>
                            Fetching available jobs...
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-state__icon">🔍</span>
                            <h3 className="empty-state__title">No Jobs Found</h3>
                            <p className="empty-state__subtitle">
                                {isMatchedView
                                    ? "No matching jobs found for the skills extracted from your resume. Try browsing all available jobs."
                                    : "Check back soon — new opportunities are posted daily."}
                            </p>
                            {isMatchedView && (
                                <button className="btn-primary" onClick={handleReset}>
                                    View All Jobs
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="job-cards-grid">
                            {jobs.map((job) => {
                                const isApplied = appliedJobIds.has(job._id);
                                const matchPct = job.matchPercentage;
                                let badgeClass = "";
                                if (matchPct != null) {
                                    if (matchPct >= 70) badgeClass = "job-card__badge--high-match";
                                    else if (matchPct >= 40) badgeClass = "job-card__badge--med-match";
                                    else badgeClass = "job-card__badge--low-match";
                                }

                                return (
                                    <div key={job._id} className="job-card">
                                        <div className="job-card__header">
                                            <div className="job-card__logo">🏢</div>
                                            <span className={`job-card__badge ${badgeClass}`}>
                                                {matchPct != null
                                                    ? `${Math.round(matchPct)}% Match`
                                                    : "Open"}
                                            </span>
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
                                            <button
                                                className={`btn-apply ${isApplied ? "btn-applied-success" : ""}`}
                                                onClick={() => !isApplied && handleOnClick(job._id)}
                                                id={`apply-btn-${job._id}`}
                                                disabled={isApplied}
                                            >
                                                {isApplied ? "✓ Applied" : "⚡ Apply Now"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}