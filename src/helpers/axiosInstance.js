import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 1. Interceptor de Petición (Lo que ya tienes)
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 2. Interceptor de Respuesta para manejar el refresco
axiosInstance.interceptors.response.use(
    (response) => response, // Si la respuesta es exitosa, solo la retornamos
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no hemos reintentado ya esta petición
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Marcamos la petición para no entrar en bucle

            try {
                // Llamada a tu endpoint de refresco (usando axios plano para evitar interceptores aquí)
                const refreshToken = localStorage.getItem("refreshToken");

                const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
                    refresh_token: refreshToken
                });

                const newToken = response.data.access_token.token;

                // Guardamos el nuevo token
                localStorage.setItem("token", newToken);

                // Actualizamos el header de la petición original y la reintentamos
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                // Si el refresco también falla, el usuario debe loguearse de nuevo
                localStorage.clear();
                console.log("error",refreshError);
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);