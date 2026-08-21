import { NavLink } from "react-router-dom";

/**
 * SeekerSidebar – shared presentational sidebar component.
 * Props:
 *   onLogout: () => void  – existing handleLogout function passed from parent
 */
export default function SeekerSidebar({ onLogout }) {
    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-brand__inner">
                    <div className="sidebar-brand__icon">🔍</div>
                    <div className="sidebar-brand__text">
                        <div className="sidebar-brand__name">FitFind</div>
                        <div className="sidebar-brand__role">Seeker Portal</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <span className="sidebar-nav__section-label">Main Menu</span>

                <NavLink
                    to="/seeker/dashboard"
                    end
                    className={({ isActive }) =>
                        `sidebar-nav__item ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-nav__item-icon">🏠</span>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/seeker/jobs"
                    className={({ isActive }) =>
                        `sidebar-nav__item ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-nav__item-icon">🔎</span>
                    Browse Jobs
                </NavLink>

                <NavLink
                    to="/seeker/appliedjobs"
                    className={({ isActive }) =>
                        `sidebar-nav__item ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-nav__item-icon">📄</span>
                    Applied Jobs
                </NavLink>

                <button className="sidebar-nav__item" disabled style={{ opacity: 0.35, cursor: "not-allowed" }}>
                    <span className="sidebar-nav__item-icon">🔖</span>
                    AI Recommedations
                </button>

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
                <button className="sidebar-logout-btn" onClick={onLogout} id="seeker-logout-btn">
                    <span className="sidebar-nav__item-icon">🚪</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}
