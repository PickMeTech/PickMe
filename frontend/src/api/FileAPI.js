const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const fileApi = {
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${API_BASE}/api/files/upload`, {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error("File uploading failed");
        }
        const imageUrl = await res.text();
        return imageUrl;
    }
};
