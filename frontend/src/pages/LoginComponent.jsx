import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userApi } from "@/api/UserAPI";
import { Header } from "@/components/ProfileHeader";
import Form from "@/components/Form";

const LoginComponent = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await userApi.login(formData.username, formData.password);
            console.log("Login successful");
            navigate("/me");
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "Login failed");
        }
    };

    return (
        <>

            <Form
                formType="login"
                onSubmit={handleSubmit}
                error={error}
                buttonText="Submit"
                buttonStyle={{
                    backgroundColor: "#F25081",
                    color: "white",
                    border: "none"
                }}
            />
        </>
    );
};

export default LoginComponent;