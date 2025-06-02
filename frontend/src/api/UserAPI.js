import memoize from "./memoize.js";
import { fileApi } from "./FileAPI.js";

const API_BASE = "/api";

const memoizedFetch = memoize();

export class UserApi {
    async login(emailOrUsername, password) {
        const res = await fetch(`${API_BASE}/auth/login`, {
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
        const res =  await fetch(`${API_BASE}/users/me`, {
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

        const res = await fetch(`${API_BASE}/users/register`, {
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
            } catch (error){
                console.error("Error parsing response JSON:", error);
            }
            throw new Error(msg);
        }

        return await res.json();
    }

    async updateProfile(userId, updateDto) {
        const res = await fetch(`${API_BASE}/users/${userId}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateDto)
        });
        if (!res.ok) throw new Error("Update failed");
        return await res.json();
    }

    async updateAvatar(userId, file) {
        const imageUrl = await fileApi.uploadImage(file);
        return await this.updateProfile(userId, { avatarUrl: imageUrl });
    }
}

export const userApi = new UserApi();
