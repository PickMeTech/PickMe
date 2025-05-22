import memoize from "./memoize.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const memoizedFetch = memoize();

export class UserApi {
    async login(emailOrUsername, password) {
        const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: emailOrUsername, password})
        });
        if (!res.ok) throw new Error("Login failed");
        return res.json();
    }

    async logout() {
        await fetch(`${API_BASE}/logout`, {
            method: "POST",
            credentials: "include"
        });
    }

    async me() {
        const res =  await memoizedFetch(`${API_BASE}/api/users/me`, {
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

        const res = await fetch(`${API_BASE}/api/users/register`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username, email, password,
                phoneNumber, country,
                birthDate, name, surname
            })
        });
        if (!res.ok) {
            let msg = `Registration failed (${res.status})`;
            try {
                msg = (await res.json()).message || msg;
            } catch {
            }
            throw new Error(msg);
        }
        return res.json();
    }
}

export const userApi = new UserApi();
