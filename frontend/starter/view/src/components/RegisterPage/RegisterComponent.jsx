import React, { useState } from "react";
import { userApi } from "@/api/UserAPI";
import { Header } from "@/components/ProfilePage/ProfileHeader";

const RegisterComponent = () => {
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
    const [currentStep, setCurrentStep] = useState(1);

    const handleRegistrationForm = async (e) => {
        e.preventDefault();
        try {
            const response = await userApi.register(formData);
            console.log("Registration successful:", response);
            // TODO: navigate to profile or show a success message
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className="card-header">
                            <h3 className="text-center">Sign Up - Step 1</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="username" className="col-md-3 control-label">
                                        Username
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            id="username"
                                            className="form-control"
                                            placeholder="enter username"
                                            value={formData.username}
                                            onChange={(e) =>
                                                setFormData({ ...formData, username: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="phoneNumber" className="col-md-3 control-label">
                                        Phone number
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            className="form-control"
                                            placeholder="enter phone number"
                                            value={formData.phoneNumber}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phoneNumber: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-3 control-label">
                                        Email
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="enter email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
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
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="enter password"
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({ ...formData, password: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ backgroundColor: "#F25081", color: "white", border: "none" }}
                                        onClick={nextStep}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="card-header">
                            <h3 className="text-center">Sign Up - Step 2</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegistrationForm}>
                                <div className="row mb-3">
                                    <label htmlFor="name" className="col-md-3 control-label">
                                        Name
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            placeholder="enter name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="surname" className="col-md-3 control-label">
                                        Surname
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            id="surname"
                                            className="form-control"
                                            placeholder="enter surname"
                                            value={formData.surname}
                                            onChange={(e) =>
                                                setFormData({ ...formData, surname: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="birthDate" className="col-md-3 control-label">
                                        Birth Date
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="date"
                                            id="birthDate"
                                            className="form-control"
                                            value={formData.birthDate}
                                            onChange={(e) =>
                                                setFormData({ ...formData, birthDate: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="country" className="col-md-3 control-label">
                                        Country
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            id="country"
                                            className="form-control"
                                            placeholder="enter country"
                                            value={formData.country}
                                            onChange={(e) =>
                                                setFormData({ ...formData, country: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                        Back
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        Complete Registration
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-end mt-5">
                    <div className="col-md-5">
                        <div className="card">{renderStep()}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterComponent;
