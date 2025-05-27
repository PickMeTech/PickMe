import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userApi } from "@/api/UserAPI";
import { Header } from "@/components/ProfileHeader";

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
            <Header />

            <div className="container">
                <div className="row justify-content-end mt-5">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-header text-center">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {error && (
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    )}
                                    <div className="row mb-3">
                                        <label htmlFor="username" className="col-md-3 control-label">
                                            Username
                                        </label>
                                        <div className="col-md-9">
                                            <input
                                                id="username"
                                                type="text"
                                                className="form-control"
                                                placeholder="enter username"
                                                value={formData.username}
                                                onChange={e =>
                                                    setFormData({ ...formData, username: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="password" className="col-md-3 control-label">
                                            Password
                                        </label>
                                        <div className="col-md-9">
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control"
                                                placeholder="enter password"
                                                value={formData.password}
                                                onChange={e =>
                                                    setFormData({ ...formData, password: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 mt-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={{
                                                backgroundColor: "#F25081",
                                                color: "white",
                                                border: "none",
                                            }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;