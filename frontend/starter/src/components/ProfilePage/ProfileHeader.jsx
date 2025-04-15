import React from "react";

const ProfileHeader = () => {
    return (
        <div className="profile-header">
            <div className="top-bar">
                <div className="logo">Pick<span>Me</span></div>
                <input className="search-bar" type="text" placeholder="Search" />
                <img className="avatar" src="/avatar.jpg" alt="User Avatar" />
            </div>

            <div className="profile-card">
                <img className="profile-pic" src="/avatar.jpg" alt="Profile" />
                <div className="info">
                    <h2>AnnaMaria</h2>
                    <textarea placeholder="tell the world what you want to pick:)"></textarea>
                    <div className="icons">
                        <button className="icon-button">🔗</button>
                        <button className="icon-button">📷</button>
                    </div>
                    <div className="delivery-address">
                        <p>pick delivery address</p>
                        <h3>Ковель, №5</h3>
                        <button className="edit-btn">edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
