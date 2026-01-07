import { axiosInstance } from "@/helpers/axiosInstance";


const createContacto = async (data) => {
    const response = await axiosInstance.post("/contactos", data);

    return response.data;
}
export { createContacto };