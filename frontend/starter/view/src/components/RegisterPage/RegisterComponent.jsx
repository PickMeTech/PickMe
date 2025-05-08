import React, { useEffect, useState } from "react";
import { userApi } from "@/api/UserAPI";

const RegisterComponent = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        city: "",
        country: "",
        bio: "",
        socials: [],
    });
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        userApi.register()
            .then(data => setUser(data))
            .catch(console.error);
    }, []);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

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
                                    <label htmlFor="username" className="col-md-3 control-label">Username</label>
                                    <div className="col-md-9">
                                        <input type="text" name="username" className="form-control" id="username" placeholder="enter username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="phoneNumber" className="col-md-3 control-label">Phone number</label>
                                    <div className="col-md-9">
                                        <input type="tel" name="phoneNumber" className="form-control" id="phoneNumber" placeholder="enter phone number" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-3 control-label">Email</label>
                                    <div className="col-md-9">
                                        <input type="email" name="email" className="form-control" id="email"
                                               placeholder="enter email" value={user.email}
                                               onChange={(e) => setUser({...user, email: e.target.value})}/>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-md-3 control-label">Password</label>
                                    <div className="col-md-9">
                                        <input type="password" name="password" className="form-control" id="password" placeholder="enter password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                    </div>
                                </div>

                                <div className="d-grid gap-2 mt-3">
                                    <button type="button" className="btn btn-primary"        style={{backgroundColor: "#F25081", color: "white", border: "none"}}
                                            onClick={nextStep}>
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
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="name" className="col-md-3 control-label">Name</label>
                                    <div className="col-md-9">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="enter name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="surname" className="col-md-3 control-label">Surname</label>
                                    <div className="col-md-9">
                                        <input type="text" name="surname" className="form-control" id="country" placeholder="enter surname" value={user.surname} onChange={(e) => setUser({ ...user, surname: e.target.value })} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="birthDate" className="col-md-3 control-label">Birth Date</label>
                                    <div className="col-md-9">
                                        <input type="date" name="birthDate" className="form-control" id="birthDate" value={user.birthDate} onChange={(e) => setUser({ ...user, birthDate: e.target.value })} />
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <label htmlFor="country" className="col-md-3 control-label">Country</label>
                                    <div className="col-md-9">
                                        <input type="text" name="country" className="form-control" id="country" placeholder="enter country" value={user.country} onChange={(e) => setUser({ ...user, country: e.target.value })} />
                                    </div>
                                </div>


                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                        Back
                                    </button>
                                    <button type="button" className="btn btn-success" >
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
        <div className="container">
            <br/> <br/>
            <div className="row justify-content-end">
                <div className="col-md-5">
                    <div className="card">
                        {renderStep()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;