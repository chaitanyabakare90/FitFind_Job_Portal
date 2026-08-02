import { NavLink } from "react-router-dom";

export default function EmployerSidebar({ onLogout }) {
    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-brand__inner">
                    <div className="sidebar-brand__icon">🎯</div>
                    <div className="sidebar-brand__text">
                        <div className="sidebar-brand__name">FitFind</div>
                        <div className="sidebar-brand__role">Employer Portal</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <span className="sidebar-nav__section-label">Main Menu</span>

                <NavLink
                    to="/employer/dashboard"
                    end
                    className={({ isActive }) =>
                        `sidebar-nav__item ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-nav__item-icon">🏠</span>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/employer/create_jobs"
                    className={({ isActive }) =>
                        `sidebar-nav__item ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-nav__item-icon">➕</span>
                    Post a Job
                </NavLink>

                <NavLink
                    to="/employer/jobs"
                    className={({ isActive }) =>
                        `sidebar-nav__item ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-nav__item-icon">💼</span>
                    Manage Jobs
                </NavLink>

                <span className="sidebar-nav__section-label">Account</span>

                <button className="sidebar-nav__item" disabled style={{ opacity: 0.35, cursor: "not-allowed" }}>
                    <span className="sidebar-nav__item-icon">👤</span>
                    Profile
                </button>

                <button className="sidebar-nav__item" disabled style={{ opacity: 0.35, cursor: "not-allowed" }}>
                    <span className="sidebar-nav__item-icon">⚙️</span>
                    Settings
                </button>
            </nav>

            {/* Logout */}
            <div className="sidebar-bottom">
                <button className="sidebar-logout-btn" onClick={onLogout} id="employer-logout-btn">
                    <span className="sidebar-nav__item-icon">🚪</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}
