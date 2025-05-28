import React, {useState} from 'react';
import Button from '@/components/Button';

const Form = ({
                  formType = 'login',
                  onSubmit,
                  error = null,
                  initialData = {},
                  buttonText,
                  buttonStyle = {},
                  showSteps = false
              }) => {
    const getInitialFormData = () => {
        switch (formType) {
            case 'login':
                return {username: "", password: "", ...initialData};
            case 'register':
                return {
                    username: "", phoneNumber: "", email: "", password: "",
                    name: "", surname: "", birthDate: "", country: "",
                    ...initialData
                };
            case 'add-wishlist':
                return {name: "", description: "", ...initialData};
            case 'add-wish':
                return {
                    title: "", description: "", price: "", url: "", imageUrl: "",
                    ...initialData
                };
            default:
                return {...initialData};
        }
    };

    const [formData, setFormData] = useState(getInitialFormData());
    const [currentStep, setCurrentStep] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    const updateFormData = (field, value) => {
        setFormData({...formData, [field]: value});
    };

    if (formType === 'add-wishlist') {
        return (
            <form className="input-group" onSubmit={handleSubmit} style={{minWidth: 220}}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Wishlist name"
                    value={formData.name}
                    onChange={e => updateFormData('name', e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Description (optional)"
                    value={formData.description}
                    onChange={e => updateFormData('description', e.target.value)}
                />
                <Button type="submit" style={buttonStyle}>
                    {buttonText || "Add"}
                </Button>
                {error && <div className="text-danger small mt-1 w-100">{error}</div>}
            </form>
        );
    }

    if (formType === 'add-wish') {
        return (
            <form className="input-group flex-column align-items-stretch" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Wish title"
                    value={formData.title}
                    onChange={e => updateFormData('title', e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Description"
                    value={formData.description}
                    onChange={e => updateFormData('description', e.target.value)}
                />
                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Price"
                    value={formData.price}
                    onChange={e => updateFormData('price', e.target.value)}
                />
                <input
                    type="url"
                    className="form-control mb-2"
                    placeholder="URL"
                    value={formData.url}
                    onChange={e => updateFormData('url', e.target.value)}
                />
                <input
                    type="url"
                    className="form-control mb-2"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={e => updateFormData('imageUrl', e.target.value)}
                />
                <Button type="submit" style={buttonStyle}>
                    {buttonText || "Add Wish"}
                </Button>
                {error && <div className="text-danger small mt-1 w-100">{error}</div>}
            </form>
        );
    }


    const renderLoginForm = () => (
        <>
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
                                onChange={e => updateFormData('username', e.target.value)}
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
                                onChange={e => updateFormData('password', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button
                            type="submit"
                            style={{
                                backgroundColor: "#F25081",
                                color: "white",
                                border: "none",
                                ...buttonStyle
                            }}
                        >
                            {buttonText || 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );

    const renderRegisterStep1 = () => (
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
                                onChange={e => updateFormData('username', e.target.value)}
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
                                onChange={e => updateFormData('phoneNumber', e.target.value)}
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
                                onChange={e => updateFormData('email', e.target.value)}
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
                                onChange={e => updateFormData('password', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{
                                backgroundColor: "#F25081",
                                color: "white",
                                border: "none",
                                ...buttonStyle
                            }}
                            onClick={nextStep}
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </>
    );

    const renderRegisterStep2 = () => (
        <>
            <div className="card-header">
                <h3 className="text-center">Sign Up - Step 2</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
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
                                onChange={e => updateFormData('name', e.target.value)}
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
                                onChange={e => updateFormData('surname', e.target.value)}
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
                                onChange={e => updateFormData('birthDate', e.target.value)}
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
                                onChange={e => updateFormData('country', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-secondary" onClick={prevStep}>
                            Back
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success"
                            style={buttonStyle}
                        >
                            {buttonText || 'Complete Registration'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );

    const renderStep = () => {
        if (formType === 'login') {
            return renderLoginForm();
        }

        switch (currentStep) {
            case 1:
                return renderRegisterStep1();
            case 2:
                return renderRegisterStep2();
            default:
                return null;
        }
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        <div className="card">
                            {renderStep()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;