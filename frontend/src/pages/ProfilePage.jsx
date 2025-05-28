import React from "react";
import ProfileHeader from "@/components/ProfileHeader.jsx";
import WishLists from "@/components/Wishlists.jsx";
import "@/styles/ProfilePage.css";

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <ProfileHeader />
            <div className="wishlist-container">
            <WishLists />
            </div>
        </div>
    );
};

export default ProfilePage;