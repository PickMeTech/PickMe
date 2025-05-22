const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default class BookApi {
    static async search(query) {
        const url = `${API_BASE}/api/books/search?q=${encodeURIComponent(query)}`;
        const res = await fetch(url, {
            credentials: "include"
        });
        if (!res.ok) throw new Error(`Book search failed (${res.status})`);
        return res.json();
    }
}
