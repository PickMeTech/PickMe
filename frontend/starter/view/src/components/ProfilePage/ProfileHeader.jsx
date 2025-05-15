import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { userApi } from "@/api/UserAPI";
import Profile from "../../assets/avatar.png";
import Search from "../../assets/search.png";
import Logo from "../../assets/logo.png";
import Socials from "../../assets/socials-button.png";
import Email from "../../assets/email-button.png";
import Share from "../../assets/share-button.png";
import Edit from "../../assets/edit-button1.png";

const ProfileHeader = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        city: "",
        country: "",
        bio: "",
        socials: [],
    });

    useEffect(() => {
        userApi.register()
            .then(data => setUser(data))
            .catch(console.error);
    }, []);

    return (
        <div className="profile-header">
            <Header />
            <ProfileSection user={user} />
        </div>
    );
};


const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = React.useRef(null);

    useEffect(() => {
        const onClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    return (
        <div className="header">
            <img src={Logo} className="logo" alt="Logo"/>
            <div className="search-field">
                <div className="search-text">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img src={Search} className="search-icon" alt="Search"/>
                </div>
            </div>
            <div className="dropdown" ref={dropdownRef}>
                <a
                    href="#"
                    className="d-flex align-items-center text-decoration-none dropdown-toggle"
                    onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(!menuOpen);
                    }}
                >
                    <img
                        src={Profile}
                        alt="User"
                        width="40"
                        height="40"
                        className="rounded-circle"
                    />
                </a>
                {menuOpen && (
                    <ul className="dropdown-menu dropdown-menu-end shadow show">
                        <li>
                            <NavLink to="/" className="dropdown-item">
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className="dropdown-item">
                                Register
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

const ProfileSection = ({user}) => (
    <div className="profile-section">
        <img src={Profile} className="avatar" alt="Profile"/>
        <div className="profile-details">
            <div className="details-header">
                <span className="hint">username</span>
                <strong className="username">{user.username}</strong>
                <div className="actions">
                    <button onClick={() => { /* TODO:share function */
                    }}>
                        <img src={Share} alt="Share"/>
                    </button>
                    <button onClick={() => { /* TODO:edit function */
                    }}>
                        <img src={Edit} alt="Edit"/>
                    </button>
                </div>
            </div>
            <span className="hint">about me</span>
            <p className="bio">{user.bio || "tell the world what you want to pick :)"}</p>
            <div className="social-icons">
                <button
                    className="social-button"
                    onClick={() => {
                        /* TODO: open socials link */
                    }}
                >
                    <img src={Socials} alt="Socials" />
                </button>
                {user.email && (
                    <button
                        className="social-button"
                        onClick={() => (window.location = `mailto:${user.email}`)}
                    >
                        <img src={Email} alt="Email" />
                    </button>
                )}
            </div>
        </div>
        <div className="delivery">
            <strong>Pick delivery address</strong>
            <p>
                {user.city}, {user.country}
            </p>
            <button>Edit</button>
        </div>
    </div>
);

export default ProfileHeader;
export { Header };