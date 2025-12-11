import { axiosInstance } from "@/helpers/axiosInstance";

const login = async (data) => {
    const response = await axiosInstance.post("/auth/login", data);

    return response.data;
}

const getDatosUsuario = async () => {
    const response = await axiosInstance.get("/auth/me");

    return response.data;
}





export {
    login,
    getDatosUsuario
};