const baseUrl = import.meta.env.VITE_API_BASE_URL
    || "http://localhost:8080/api";

export class UserApi {
    // async login(email, password) {
    //     const res = await fetch(`${baseUrl}/auth/login`, {
    //         method: "POST",
    //         credentials: "include",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ email, password }),
    //     });
    //     if (!res.ok) throw new Error("Login failed");
    //     return res.json();
    // }
    async register(userData) {
        const {
            username,
            email,
            password,
            phoneNumber,
            country,
            birthDate,
            name,
            surname,
            city,
        } = userData;

        const response = await fetch(`${baseUrl}/users/register`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                email,
                password,
                phoneNumber,
                country,
                birthDate,
                name,
                surname,
                city,
            }),
        });

        if (!response.ok) {
            let message = `Registration failed (${response.status})`;
            try {
                const error = await response.json();
                message = error.message || message;
            } catch {}
            throw new Error(message);
        }

        return response.json();
    }
}
export const userApi = new UserApi();