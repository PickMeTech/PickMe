import React from "react";
import ProfileHeader from "./ProfileHeader.jsx";
import WishList from "./WishList.jsx";
import "./ProfilePage.css";

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <ProfileHeader />
            <WishList />
        </div>
    );
};

export default ProfilePage;