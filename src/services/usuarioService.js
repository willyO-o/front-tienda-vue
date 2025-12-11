import { axiosInstance } from "@/helpers/axiosInstance";


const getUsuarios = async (params = {}) => {


    if (params.limit === undefined) {
        params.limit = 10;
    }


    if (params.page !== undefined) {

        params.offset = (params.page - 1) * params.limit

    }

    const response = await axiosInstance.get("/usuarios");
    return response.data;
}


export {
    getUsuarios
}