import { useState } from "react"
import axios from "axios"
import EmployerSidebar from "../../components/EmployerSidebar"
import { useNavigate } from "react-router-dom"
import "../../styles/dashboard.css"

export default function CreateJob() {
    
    let [formData, setFormData] = useState({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
        skills: []
    });

    let handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "skills") {
            setFormData((currData) => ({
                ...currData,
                skills: value.split(",").map((skill) => skill.trim())
                // for skills becaz someone can enter more spaces in between
            }));
        } else {
            setFormData((currData) => ({
                ...currData,
                [name]: value
            }));
        }
    };

    let handleOnSubmit = async (event) => {
        event.preventDefault();
        setFormData({
            title: "",
            company: "",
            description: "",
            location: "",
            salary: "",
            skills: []
        })
        let token = localStorage.getItem("token")
        try {
            const response = await axios.post("http://localhost:8080/empolyer/create_jobs",
                formData,
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
                    <h1 className="dashboard-topbar__title">Post a Job</h1>
                    <div className="dashboard-topbar__right">
                        <span className="dashboard-topbar__name">Employer</span>
                        <div className="dashboard-topbar__avatar">E</div>
                    </div>
                </header>

                <div className="dashboard-content">

                    {/* Page header */}
                    <div className="page-header">
                        <h2 className="page-header__title">Create a New Job Listing</h2>
                        <p className="page-header__subtitle">
                            Fill in the details below to publish your job opening to thousands of seekers.
                        </p>
                    </div>

                    {/* Form card */}
                    <div className="form-card">
                        <form className="form-fields" onSubmit={handleOnSubmit} id="create-job-form">

                            {/* Row 1: Title + Company */}
                            <div className="form-row-2">
                                <div className="form-field">
                                    <label className="form-field__label" htmlFor="title">Job Title</label>
                                    <input
                                        className="form-field__input"
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={formData.title}
                                        placeholder="e.g. Senior React Developer"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label className="form-field__label" htmlFor="company">Company Name</label>
                                    <input
                                        className="form-field__input"
                                        type="text"
                                        name="company"
                                        id="company"
                                        value={formData.company}
                                        placeholder="e.g. Acme Corp"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 2: Location + Salary */}
                            <div className="form-row-2">
                                <div className="form-field">
                                    <label className="form-field__label" htmlFor="location">Location</label>
                                    <input
                                        className="form-field__input"
                                        type="text"
                                        name="location"
                                        id="location"
                                        value={formData.location}
                                        placeholder="e.g. Mumbai, Remote"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label className="form-field__label" htmlFor="salary">Annual Salary (₹)</label>
                                    <input
                                        className="form-field__input"
                                        type="number"
                                        name="salary"
                                        id="salary"
                                        value={formData.salary}
                                        placeholder="e.g. 1200000"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-field">
                                <label className="form-field__label" htmlFor="description">Job Description</label>
                                <textarea
                                    className="form-field__textarea"
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    placeholder="Describe the role, responsibilities, and expectations..."
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Skills */}
                            <div className="form-field">
                                <label className="form-field__label" htmlFor="skills">
                                    Required Skills <span className="form-field__label-hint">(comma-separated)</span>
                                </label>
                                <input
                                    className="form-field__input"
                                    type="text"
                                    name="skills"
                                    id="skills"
                                    value={formData.skills.join(",")}
                                    placeholder="e.g. React, Node.js, MongoDB"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Submit */}
                            <div>
                                <button className="form-submit-btn" type="submit" id="submit-job-btn">
                                    🚀 Publish Job
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </main>
        </div>
    )
}