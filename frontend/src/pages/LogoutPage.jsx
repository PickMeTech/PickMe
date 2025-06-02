import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/api/UserAPI";

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                await userApi.logout();
            } catch (err) {
                console.error("Logout failed:", err);
            } finally {
                navigate("/login");
            }
        })();
    }, [navigate]);

    return null;
};

export default LogoutPage;
