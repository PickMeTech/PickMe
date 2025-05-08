import React from "react";
import plusIcon from "/src/assets/plus.png";

const PickItemAdd = ({ onClick }) => (
    <div className="pick-item-column" onClick={onClick}>
        <div className="pick-item add">
            <div className="add-text">
                <img src={plusIcon} alt="Plus Icon" className="plus-icon" />
                Add Pick
            </div>
        </div>
    </div>
);

const PickItem = ({ label, status }) => (
    <div className="pick-item-column">
        <div className={`pick-item ${status === "picked" ? "picked" : ""}`}>
            {status === "picked" && <div className="status picked">Picked</div>}
        </div>
        <div className="pick-text">{label}</div>
    </div>
);
export default PickItem;