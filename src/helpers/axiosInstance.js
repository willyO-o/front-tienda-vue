import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",

    },
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

//renovar token automaticamente si ha expirado

let contadorReintentos = 0;

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

            if (contadorReintentos >= 1) {
                window.location.href = "/login";
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                return Promise.reject(error);
            }
            contadorReintentos++;

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, { refresh_token: refreshToken }, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${refreshToken}`
                    },
                })

                const { access_token, refresh_token } = response.data;

                localStorage.setItem("token", access_token);
                localStorage.setItem("refreshToken", JSON.stringify(refresh_token));
                originalRequest.headers.Authorization = `Bearer ${access_token}`;

                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Error refreshing token:", err);
                // Optionally, redirect to login page
                window.location.href = "/login";
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                return Promise.reject(err);

            }
        }
        return Promise.reject(error);
    }
);

