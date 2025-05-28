import React from "react";

const Button = ({ children, style = {}, className = "", ...props }) => {
    return (
        <button
            className={`btn ${className}`}
            style={{
                backgroundColor: "#F25081",
                color: "white",
                border: "none",
                borderRadius: "20px",
                ...style,
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
