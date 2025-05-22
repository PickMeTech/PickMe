import memoize from "./memoize.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const memoizedFetch = memoize();

export class WishApi {
    async createWish(wishListId, wishData) {
        const { title, description, price, url, imageUrl } = wishData;
        const res = await fetch(`${API_BASE}/api/wishlists/${wishListId}/wishes`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(wishData)
        });
        if (!res.ok) throw new Error("Failed to create wish");
        return res.json();
    }

    async getAllWishes(wishListId) {
        const res = await memoizedFetch(`${API_BASE}/api/wishlists/${wishListId}/wishes`, {
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch wishes");
        return res.json();
    }

    async getWish(wishListId, wishId) {
        const res = await memoizedFetch(`${API_BASE}/api/wishlists/${wishListId}/wishes/${wishId}`, {
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch wish");
        return res.json();
    }

    async getOldestWish(wishListId) {
        const res = await memoizedFetch(`${API_BASE}/api/wishlists/${wishListId}/wishes/peek-oldest`, {
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch oldest wish");
        return res.json();
    }

    async getNewestWish(wishListId) {
        const res = await memoizedFetch(`${API_BASE}/api/wishlists/${wishListId}/wishes/peek-newest`, {
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch newest wish");
        return res.json();
    }

    async updateWish(wishListId, wishId, wishData) {
        const { title, description, price, url, imageUrl } = wishData;
        const res = await fetch(`${API_BASE}/api/wishlists/${wishListId}/wishes/${wishId}`, {
            method: "PUT",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(wishData)
        });
        if (!res.ok) throw new Error("Failed to update wish");
        return res.json();
    }

    async deleteWish(wishListId, wishId) {
        const res = await fetch(`${API_BASE}/api/wishlists/${wishListId}/wishes/${wishId}`, {
            method: "DELETE",
            credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to delete wish");
    }

    async addWishFromBook(wishListId, bookData) {
        const res = await fetch(`${API_BASE}/api/wishlists/${wishListId}/wishes/from-book`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bookData)
        });
        if (!res.ok) throw new Error("Failed to add wish from book");
        return res.json();
    }
}

export const wishApi = new WishApi();