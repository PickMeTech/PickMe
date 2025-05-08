import React from "react";
import Profile from "/src/assets/avatar.png"
import Search from "/src/assets/search.png";

const ProfileHeader = () => {
    return (
        <div className="profile-header">
            <Header />
            <ProfileSection />
        </div>
    );
};

const Header = () => {
    return (
        <div className="header">
            <div className="app-name">
                Pick<span className="pink-text">Me</span>
            </div>
            <div className="search-field">
                <div className="search-text">Search</div>
                <img src={Search} className="search-icon" alt="Search" />
            </div>
            <img src={Profile} className="user-avatar-small" alt="User" />
        </div>
    );
};

const ProfileSection = () => {
    return (
        <div className="profile-section">
            <div className="profile-content">
                <div className="profile-column">
                    <img src={Profile} className="profile-picture" alt="Profile" />
                </div>
                <div className="profile-details-column">
                    <div className="profile-details">
                        <div className="profile-details-container">
                            <div className="profile-header">
                                <div className="profile-info">
                                    <div className="label">username</div>
                                    <div className="username">UserData</div>
                                </div>
                                <div className="profile-actions">
                                    <button className="action-button social-btn">Share</button>
                                    <button className="action-button edit-btn">Edit</button>
                                </div>
                            </div>
                            <div className="label about-me">about me</div>
                        </div>
                        <div className="about-me-box">
                            tell the world what you want to pick:)
                        </div>
                        <div className="social-container">
                            <div className="social-icons">
                                <img src="/api/placeholder/42/42" className="social-icon" alt="Social" />
                                <img src="/api/placeholder/46/46" className="social-icon" alt="Social" />
                            </div>
                            <div className="delivery-section">
                                <div className="delivery-info">
                                    <div className="label">pick delivery address</div>
                                    <div className="address">Ковель, №5</div>
                                </div>
                                <button className="action-button edit-address-btn">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;