import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/api/UserAPI";
import WithAuth from "@/components/WithAuth";

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                await userApi.logout();
            } catch (err) {
                console.error("Logout failed:", err);
            } finally {
                localStorage.removeItem("isLoggedIn");
                navigate("/login", { replace: true });
            }
        })();
    }, [navigate]);

    return null;
};

export default WithAuth(LogoutPage);