import React from "react";
import { Header } from "@/components/ProfileHeader";
import Slideshow from "@/components/SlideShow";
import "../styles/MainPage.css";

const MainPage = () => {
    const urls = [
        "https://picsum.photos/id/24/367/267",
        "https://picsum.photos/id/21/367/267",
        "https://picsum.photos/id/23/367/267",
    ];

    return (
        <div className="profile-page">
            <Header />
            <div className="main-page">
                <h1 className="main-heading">
                    <span className="hello-text">Hello world!</span>
                    <span className="wish-text">Pick what you really wish</span>
                </h1>

                <div className="slideshow-wrapper">
                    <Slideshow imageUrls={urls} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
