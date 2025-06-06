import React, { useState, useEffect, useRef } from "react";
import { userApi } from "@/api/UserAPI";
import { fileApi } from "@/api/FileAPI";
import Form from "@/components/Form";
import ModalWindow from "@/components/ModalWindow";
import Button from "@/components/Button";
import ProfilePlaceholder from "@/assets/avatar.png";
import withAuth from "@/components/WithAuth.jsx";

const EditProfile = ({ triggerButtonText = "Edit Profile" }) => {
    const [user, setUser] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                const me = await userApi.me();
                setUser(me);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const handleAvatarSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarFile(file);
        const previewUrl = URL.createObjectURL(file);
        setUser((prev) => ({ ...prev, profileImageUrl: previewUrl }));
    };

    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        setError(null);

        try {
            let finalImageUrl = user.profileImageUrl;
            if (avatarFile) {
                finalImageUrl = await fileApi.uploadImage(avatarFile);
            }

            const updateDto = {
                ...formValues,
                profileImageUrl: finalImageUrl,
            };

            const updatedUser = await userApi.updateProfile(user.id, updateDto);
            setUser(updatedUser);
            setAvatarFile(null);
            setModalOpen(false);
        } catch (err) {
            console.error(err);
            setError("Failed to save profile changes");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <>
            <Button onClick={() => setModalOpen(true)}>{triggerButtonText}</Button>

            <ModalWindow
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setAvatarFile(null);
                    setError(null);
                    userApi.me().then(setUser).catch(console.error);
                }}
                title="Edit Profile"
            >
                <div className="edit-profile-modal-content" style={{ maxWidth: 600, margin: "0 auto" }}>
                    <div className="mb-4 d-flex align-items-center">
                        <img
                            src={user.profileImageUrl || ProfilePlaceholder}
                            alt="Avatar"
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: 16,
                                border: "1px solid #ccc",
                            }}
                        />
                        <Button onClick={() => fileInputRef.current.click()} disabled={loading}>
                            {loading ? "Uploading…" : "Change Avatar"}
                        </Button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleAvatarSelect}
                        />
                    </div>

                    <Form
                        formType="edit-profile"
                        initialData={user}
                        onSubmit={handleFormSubmit}
                        buttonText={loading ? "Saving…" : "Save Changes"}
                        error={error}
                    />
                </div>
            </ModalWindow>
        </>
    );
};

export default withAuth(EditProfile);
