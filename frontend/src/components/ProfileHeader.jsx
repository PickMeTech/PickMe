import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { userApi } from "@/api/UserAPI";
import Profile from "../assets/avatar.png";
import Search from "../assets/search.png";
import Logo from "../assets/logo.png";
import Socials from "../assets/socials-button.png";
import Email from "../assets/email-button.png";
import Share from "../assets/share-button.png";
import Edit from "../assets/edit-button1.png";
import "../styles/ProfilePage.css";
import EditProfile from "@/components/EditProfile";

const ProfileHeader = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        city: "",
        country: "",
        bio: "",
        socials: [],
    });
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await userApi.me();
                setUser(data);
            } catch (error) {
                console.log("User not authenticated:", error);
            }
        };

        if (localStorage.getItem("isLoggedIn") === "true") {
            fetchUserData();
        }
    }, []);

    const handleSave = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <div className="profile-header">
            <Header />
            <ProfileSection user={user} onEdit={() => setEditModalOpen(true)} />

            <EditProfile
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                initialUserData={user}
                onSave={handleSave}
            />
        </div>
    );
};

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null);

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
            <img src={Logo} className="logo" alt="Logo" />
            <div className="search-field">
                <div className="search-text">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img src={Search} className="search-icon" alt="Search" />
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
                            <NavLink to="/me" className="dropdown-item">
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className="dropdown-item">
                                Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="dropdown-item">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout" className="dropdown-item">
                                Logout
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/main" className="dropdown-item">
                                Main
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

const ProfileSection = ({user, onEdit}) => (
    <div className="profile-section">
        <img
            src={user.profileImageUrl || Profile}
            className="avatar"
            alt="Profile"
        />
        <div className="profile-details">
            <div className="details-header">
                <div className="user-info">
                    <span className="hint">username</span>
                    <strong className="username">{user.username}</strong>
                </div>
                <div className="actions">
                    <button className="icon-button">
                        <img src={Share} alt="Share" />
                    </button>
                    <button
                        className="icon-button"
                        onClick={onEdit}
                    >
                        <img src={Edit} alt="Edit" />
                    </button>
                </div>
            </div>

            <span className="hint">about me</span>
            <p className="bio">
                {user.bio
                    ? user.bio
                    : <span className="hint">tell the world what you want to pick :)</span>}
            </p>
            <div className="social-icons">
                <button
                    className="social-button"
                    onClick={() => {
                        if (user.socials) {
                            window.location = user.socials;
                        }
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

            <div className="delivery">
                <span className="hint">pick delivery address</span>
                <div className="delivery-address">
                    <span>
                        {user.city}, {user.country}
                    </span>
                    <button
                        className="delivery-button"
                        onClick={onEdit}
                    >
                        <img src={Edit} alt="Edit" />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileHeader;
export { Header, ProfileSection };