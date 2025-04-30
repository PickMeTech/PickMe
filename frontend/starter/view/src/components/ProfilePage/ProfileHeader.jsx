// @ts-nocheck
import React from 'react'
import avatarIcon  from '@/assets/avatar.png';
import socialsIcon from '@/assets/socials-button.png';
import emailIcon   from '@/assets/email-button.png';

const ProfileHeader = () => {
    return (
        <div className="profile-header">
            <div className="top-bar">
                <div className="logo">Pick<span>Me</span></div>
                <input className="search-bar" type="text" placeholder="Search" />
                <img className="avatar" src={avatarIcon} alt="User Avatar"/>
            </div>

            <div className="profile-card">
                <img className="profile-pic" src={avatarIcon} alt="Profile"/>
                <div className="info">
                    <h2>AnnaMaria</h2>
                    <textarea placeholder="tell the world what you want to pick:)"></textarea>
                    <div className="icons">
                        <button className="icon-button" className="icon-button socials-btn">
                            <img src={socialsIcon} alt="Share on socials"/>
                        </button>
                        <button className="icon-button">
                            <img src={emailIcon} alt="Email"/>
                        </button>
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
