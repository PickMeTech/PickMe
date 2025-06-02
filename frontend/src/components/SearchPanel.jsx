import React from "react";
import Search from "@/assets/search.png";

const SearchPanel = ({ search, setSearch, placeholder = "Search" }) => (
    <div className="position-relative flex-grow-1">
        <img
            src={Search}
            alt="search"
            style={{
                width: "20px",
                height: "20px",
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                opacity: 0.7
            }}
        />
        <input
            type="text"
            className="form-control ps-5"
            style={{
                borderRadius: "20px",
            }}
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
);

export default SearchPanel;
