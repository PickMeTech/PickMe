import memoize from "./memoize.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const memoizedFetch = memoize();

export class WishListApi {
    async createWishList(userId, wishListData) {
        const {name, description} = wishListData;
        const res = await fetch(
            `${API_BASE}/api/users/${userId}/wishlists`,
            {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, description})
            }
        );
        if (!res.ok) throw new Error("Failed to create wish list");
        return res.json();
    }

    async getAllWishLists(userId) {
        const res = await memoizedFetch(
            `${API_BASE}/api/users/${userId}/wishlists`,
            {credentials: "include"}
        );
        if (!res.ok) throw new Error("Failed to fetch wish lists");
        return res.json();
    }

    async getWishList(userId, wishListId) {
        const res = await memoizedFetch(
            `${API_BASE}/api/users/${userId}/wishlists/${wishListId}`,
            {credentials: "include"}
        );
        if (!res.ok) throw new Error("Failed to fetch wish list");
        return res.json();
    }

    async updateWishList(userId, wishListId, wishListData) {
        const {name, description} = wishListData;
        const res = await fetch(
            `${API_BASE}/api/users/${userId}/wishlists/${wishListId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, description})
            }
        );
        if (!res.ok) throw new Error("Failed to update wish list");
        return res.json();
    }

    async deleteWishList(userId, wishListId) {
        const res = await fetch(
            `${API_BASE}/api/users/${userId}/wishlists/${wishListId}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );
        if (!res.ok) throw new Error("Failed to delete wish list");
    }
}

export const wishListApi = new WishListApi();
