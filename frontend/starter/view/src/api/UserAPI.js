const API_BASE  = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const AUTH_BASE = API_BASE;
const REST_BASE = `${API_BASE}/api`;

export class UserApi {
    async login(emailOrUsername, password) {
        const res = await fetch(`${AUTH_BASE}/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username: emailOrUsername, password })
        });
        if (!res.ok) throw new Error("Login failed");
        return res.json();
    }

    async logout() {
        await fetch(`${AUTH_BASE}/logout`, {
            method: "POST",
            credentials: "include"
        });
    }

    async me() {
        const res = await fetch(`${REST_BASE}/users/me`, {
            credentials: "include"
        });
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
    }

    async register(userData) {
        const {
            username, email, password,
            phoneNumber, country,
            birthDate, name, surname
        } = userData;

        const res = await fetch(`${REST_BASE}/users/register`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username, email, password,
                phoneNumber, country,
                birthDate, name, surname
            })
        });
        if (!res.ok) {
            let msg = `Registration failed (${res.status})`;
            try { msg = (await res.json()).message || msg; } catch {}
            throw new Error(msg);
        }
        return res.json();
    }
}

export const userApi = new UserApi();
