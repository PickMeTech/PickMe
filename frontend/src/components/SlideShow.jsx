import React, { useState, useEffect, useRef } from "react";
import { streamProcessor } from "../utils/streamProcessor";
import "../styles/Slideshow.css";

const Slideshow = ({ imageUrls = [] }) => {
    const [loadedSrcs, setLoadedSrcs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const objectUrls = [];

        const loadImages = async () => {
            const results = [];
            for (const url of imageUrls) {
                try {
                    const blob = await streamProcessor(url);
                    const objectUrl = URL.createObjectURL(blob);
                    objectUrls.push(objectUrl);
                    results.push(objectUrl);
                } catch (err) {
                    console.error("Error loading image:", err);
                }
            }
            setLoadedSrcs(results);
        };

        loadImages().catch(err => console.error('Failed to load images:', err));

        return () => {
            for (let i = 0; i < objectUrls.length; i++) {
                URL.revokeObjectURL(objectUrls[i]);
            }
        };
    }, [imageUrls]);

    useEffect(() => {
        if (loadedSrcs.length === 0) return;

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === loadedSrcs.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [loadedSrcs]);

    const prevSlide = () => {
        clearInterval(intervalRef.current);
        setCurrentIndex((prev) =>
            prev === 0 ? loadedSrcs.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        clearInterval(intervalRef.current);
        setCurrentIndex((prev) =>
            prev === loadedSrcs.length - 1 ? 0 : prev + 1
        );
    };

    const goToSlide = (index) => {
        clearInterval(intervalRef.current);
        setCurrentIndex(index);
    };

    return (
        <div className="slideshow-container">
            <div className="slideshow">
                {loadedSrcs.length > 0 ? (
                    <>
                        <div
                            className="slides-container"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {loadedSrcs.map((src, idx) => (
                                <div className="slide" key={idx}>
                                    <img src={src} alt={`Slide ${idx + 1}`} />
                                </div>
                            ))}
                        </div>

                        <button className="nav prev" onClick={prevSlide}>
                            &#10094;
                        </button>
                        <button className="nav next" onClick={nextSlide}>
                            &#10095;
                        </button>

                        <div className="indicators">
                            {loadedSrcs.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`indicator ${
                                        idx === currentIndex ? "active" : ""
                                    }`}
                                    onClick={() => goToSlide(idx)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Loading</p>
                )}
            </div>
        </div>
    );
};

export default Slideshow;
