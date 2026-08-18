import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import SeekerSidebar from "../../components/SeekerSidebar";
import "../../styles/dashboard.css";

export default function GetJobs() {
    // ── Existing logic – PRESERVED INTACT ────────────────────
    const [jobs, setJobs] = useState([]);
    const [resumeFile,setResumeFile] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8080/jobs",
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

    let handleOnClick = async (job_id) => {
        try {
            const response = await axios.post("http://localhost:8080/application",
                {
                    jobId: job_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        } catch (err) {
            console.log(err.message);
        }
    }

    let handleOnSubmit = async(event) =>{
        try{
            event.preventDefault();

            if(!resumeFile){
                console.log("Please select a resume");
                return;
            }
            const formData = new FormData();
            formData.append("resume",resumeFile);
            
            const response = await axios.post("http://localhost:8080/resume_matching",
                formData,
                {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        }catch(err){
            console.log(err.message);
        }
    }

    let handleOnChange = (event) =>{
        setResumeFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }
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

                    {/* Page header */}
                    <div className="page-header">
                        <h2 className="page-header__title">All Available Jobs</h2>
                        <p className="page-header__subtitle">
                            Browse open positions and apply directly from here.
                        </p>
                    </div>

                    <div>
                        <form onSubmit={handleOnSubmit}>
                            <input type="file" accept=".pdf" onChange={handleOnChange}/>
                            <button>Find Matching Jobs</button>
                        </form>
                    </div>

                    {/* Jobs grid */}
                    {jobs === null ? (
                        <div className="dashboard-loading">
                            <span className="spinner"></span>
                            Fetching available jobs...
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-state__icon">🔍</span>
                            <h3 className="empty-state__title">No Jobs Available Right Now</h3>
                            <p className="empty-state__subtitle">
                                Check back soon — new opportunities are posted daily.
                            </p>
                        </div>
                    ) : (
                        <div className="job-cards-grid">
                            {jobs.map((job) => (
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
                                            className="btn-apply"
                                            onClick={() => handleOnClick(job._id)}
                                            id={`apply-btn-${job._id}`}
                                        >
                                            ⚡ Apply Now
                                        </button>
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