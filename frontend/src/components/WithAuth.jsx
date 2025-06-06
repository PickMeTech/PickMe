import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [authState, setAuthState] = useState({
            isLoading: true,
            isAuthenticated: false
        });

        useEffect(() => {
            const checkAuth = () => {
                try {
                    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                    console.log("withAuth: checking authentication", isLoggedIn);
                    setAuthState({
                        isLoading: false,
                        isAuthenticated: isLoggedIn
                    });

                } catch (error) {
                    console.error("Auth check error:", error);
                    setAuthState({
                        isLoading: false,
                        isAuthenticated: false
                    });
                }
            };

            checkAuth();

            const handleStorageChange = (e) => {
                if (e.key === 'isLoggedIn') {
                    checkAuth();
                }
            };

            window.addEventListener('storage', handleStorageChange);

            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }, []);

        if (!authState.isAuthenticated) {
            console.log("withAuth: redirecting to /login");
            return <Navigate to="/login" replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;