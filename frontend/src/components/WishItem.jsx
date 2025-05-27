import React from "react";
import plusIcon from "/src/assets/plus.png";

const WishItemAdd = ({ onClick }) => (
    <div className="pick-item-column" onClick={onClick}>
        <div className="wish-item add">
            <div className="add-text">
                <img src={plusIcon} alt="Plus Icon" className="plus-icon" />
                Add Pick
            </div>
        </div>
    </div>
);

const WishItem = ({ label, status }) => (
    <div className="wish-item-column">
        <div className={`pick-item ${status === "picked" ? "picked" : ""}`}>
            {status === "picked" && <div className="status picked">Picked</div>}
        </div>
        <div className="pick-text">{label}</div>
    </div>
);

export default WishItem;
export { WishItemAdd };