import React from "react";
import ProfileHeader from "@/components/ProfileHeader.jsx";
import WishList from "@/components/WishList.jsx";
import "@/styles/ProfilePage.css";

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <ProfileHeader />
            <WishList />
        </div>
    );
};

export default ProfilePage;