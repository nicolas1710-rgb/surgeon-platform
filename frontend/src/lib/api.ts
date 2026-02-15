const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
}

function authHeaders(token: string): HeadersInit {
    return { Authorization: `Bearer ${token}` };
}

// ===== PUBLIC API =====

export const api = {
    // Profile
    getProfile: () => fetchApi<any>("/profile"),

    // Procedures
    getProcedures: () => fetchApi<any[]>("/procedures"),

    // Gallery
    getGallery: () => fetchApi<any[]>("/gallery"),

    // Testimonials
    getTestimonials: () => fetchApi<any[]>("/testimonials"),

    // Location
    getLocation: () => fetchApi<any>("/location"),

    // Appointments
    createAppointment: (data: any) =>
        fetchApi<any>("/appointments", { method: "POST", body: JSON.stringify(data) }),

    // ===== AUTH API =====
    login: (email: string, password: string) =>
        fetchApi<any>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

    register: (data: any) =>
        fetchApi<any>("/auth/register", { method: "POST", body: JSON.stringify(data) }),

    getMe: (token: string) =>
        fetchApi<any>("/auth/me", { headers: authHeaders(token) }),

    // ===== ADMIN API =====
    admin: {
        // Profile
        updateProfile: (token: string, data: any) =>
            fetchApi<any>("/profile", { method: "PUT", headers: authHeaders(token), body: JSON.stringify(data) }),

        // Procedures
        getProcedures: (token: string) =>
            fetchApi<any[]>("/procedures/admin", { headers: authHeaders(token) }),
        createProcedure: (token: string, data: any) =>
            fetchApi<any>("/procedures", { method: "POST", headers: authHeaders(token), body: JSON.stringify(data) }),
        updateProcedure: (token: string, id: number, data: any) =>
            fetchApi<any>(`/procedures/${id}`, { method: "PUT", headers: authHeaders(token), body: JSON.stringify(data) }),
        deleteProcedure: (token: string, id: number) =>
            fetchApi<any>(`/procedures/${id}`, { method: "DELETE", headers: authHeaders(token) }),

        // Gallery
        getGallery: (token: string) =>
            fetchApi<any[]>("/gallery/admin", { headers: authHeaders(token) }),
        createGalleryItem: (token: string, data: any) =>
            fetchApi<any>("/gallery", { method: "POST", headers: authHeaders(token), body: JSON.stringify(data) }),
        updateGalleryItem: (token: string, id: number, data: any) =>
            fetchApi<any>(`/gallery/${id}`, { method: "PUT", headers: authHeaders(token), body: JSON.stringify(data) }),
        deleteGalleryItem: (token: string, id: number) =>
            fetchApi<any>(`/gallery/${id}`, { method: "DELETE", headers: authHeaders(token) }),

        // Testimonials
        getTestimonials: (token: string) =>
            fetchApi<any[]>("/testimonials/admin", { headers: authHeaders(token) }),
        createTestimonial: (token: string, data: any) =>
            fetchApi<any>("/testimonials", { method: "POST", headers: authHeaders(token), body: JSON.stringify(data) }),
        updateTestimonial: (token: string, id: number, data: any) =>
            fetchApi<any>(`/testimonials/${id}`, { method: "PUT", headers: authHeaders(token), body: JSON.stringify(data) }),
        deleteTestimonial: (token: string, id: number) =>
            fetchApi<any>(`/testimonials/${id}`, { method: "DELETE", headers: authHeaders(token) }),

        // Location
        updateLocation: (token: string, data: any) =>
            fetchApi<any>("/location", { method: "PUT", headers: authHeaders(token), body: JSON.stringify(data) }),

        // Appointments
        getAppointments: (token: string) =>
            fetchApi<any[]>("/appointments", { headers: authHeaders(token) }),
        updateAppointmentStatus: (token: string, id: number, status: string) =>
            fetchApi<any>(`/appointments/${id}/status`, { method: "PUT", headers: authHeaders(token), body: JSON.stringify({ status }) }),
        deleteAppointment: (token: string, id: number) =>
            fetchApi<any>(`/appointments/${id}`, { method: "DELETE", headers: authHeaders(token) }),

        // Analytics
        getDashboard: (token: string) =>
            fetchApi<any>("/analytics/dashboard", { headers: authHeaders(token) }),

        // Media
        uploadMedia: async (token: string, file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch(`${API_BASE}/media/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            if (!res.ok) throw new Error("Upload failed");
            return res.json();
        },
    },
};
