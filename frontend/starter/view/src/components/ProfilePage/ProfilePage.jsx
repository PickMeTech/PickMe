import React from "react";
import ProfileHeader from "./ProfileHeader.jsx";
import PickList from "./PickList.jsx";
import "./ProfilePage.css";

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <ProfileHeader />
            <PickList />
        </div>
    );
};

export default ProfilePage;