import { axiosInstance } from "@/helpers/axiosInstance";


const enviarMensaje = async (data) => {
    
    const response = await axiosInstance.post("/contactos", data);
    return response.data;
}







export {
    enviarMensaje
}