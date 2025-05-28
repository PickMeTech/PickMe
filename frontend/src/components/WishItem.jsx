import React, { useState, useCallback } from "react";
import { wishApi } from "@/api/WishAPI";
import "@/styles/WishLists.css";

const WishItem = ({
                      id,
                      title,
                      status,
                      wishListId,
                      onStatusChange,
                      onDelete
                  }) => {
    const [isPicked, setIsPicked] = useState(status === "picked");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleHeartClick = useCallback(() => {
        if (isUpdating) return;
        setIsUpdating(true);

        const newStatus = !isPicked;
        setIsPicked(newStatus);

        wishApi
            .updateWish(wishListId, id, { title, status: newStatus ? "picked" : "active" })
            .then(() => {
                if (onStatusChange) onStatusChange(id, newStatus ? "picked" : "active");
            })
            .catch(() => {
                setIsPicked(!newStatus);
                alert("Error updating wish status");
            })
            .finally(() => setIsUpdating(false));
    }, [isPicked, isUpdating, wishListId, id, title, onStatusChange]);

    const handleDelete = useCallback(() => {
        if (!window.confirm("Are you sure you want to delete this wish?")) return;
        wishApi
            .deleteWish(wishListId, id)
            .then(() => {
                if (onDelete) onDelete(id);
            })
            .catch(() => {
                alert("Error deleting wish");
            });
    }, [wishListId, id, onDelete]);

    return (
        <div className="wish-item-card h-100">
            <div className="item-image">
                <button
                    className={`heart-icon ${isPicked ? "picked" : ""} ${isUpdating ? "updating" : ""}`}
                    onClick={handleHeartClick}
                    disabled={isUpdating}
                    title="Mark as picked"
                >
                    {isUpdating ? (
                        <div className="spinner-border" style={{ width: "16px", height: "16px" }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <i className={`${isPicked ? "fas" : "far"} fa-heart`}></i>
                    )}
                </button>
                <button
                    className="delete-icon"
                    onClick={handleDelete}
                    title="Delete wish"
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="item-content">
                <div className="item-title">{title}</div>
                {isPicked && <div className="picked-badge">Picked</div>}
            </div>
        </div>
    );
};

export default WishItem;