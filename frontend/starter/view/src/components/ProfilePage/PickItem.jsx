import React from "react";

const PickItem = ({ label, type, status }) => {
    if (type === "add") {
        return (
            <div className="pick-item add">
                <div className="plus">+ {/* тут буде картинка */}</div>
                <p>add pick</p>
            </div>
        );
    }

    return (
        <div className={`pick-item ${status || ""}`}>
            <div className="dropdown"> ^{/* тут буде картинка */}</div>
            <p>{label}</p>
            {status && <div className="status">{status === "picked" ? "Picked" : "In progress..."}</div>}
            {/* тут буде картинка */}
        </div>
    );
};

export default PickItem;
