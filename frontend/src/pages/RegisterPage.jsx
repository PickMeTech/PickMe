import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/api/UserAPI";
import { Header } from "@/components/ProfileHeader";
import Form from "@/components/Form"; // Adjust import path as needed

const RegisterPage = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        phoneNumber: "",
        email: "",
        password: "",
        name: "",
        surname: "",
        birthDate: "",
        country: "",
    });

    const handleRegistrationForm = async (data) => {
        setError(null);
        try {
            const response = await userApi.register(data);
            console.log("Registration successful:", response);
            navigate("/me");
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message || "Registration failed");
        }
    };

    return (
        <>
            <Header />
                        <Form
                            formType="register"
                            onSubmit={handleRegistrationForm}
                            error={error}
                            initialData={formData}
                            buttonText="Complete Registration"
                            buttonStyle={{ backgroundColor: "#F25081", color: "white" }}
                            showSteps={true}
                        />
        </>
    );
};

export default RegisterPage;