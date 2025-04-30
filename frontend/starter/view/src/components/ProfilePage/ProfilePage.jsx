import React from "react";
import ProfileHeader from "./ProfileHeader";
import PickList from "./PickList";
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