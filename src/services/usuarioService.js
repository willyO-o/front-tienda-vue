import { axiosInstance } from "@/helpers/axiosInstance";


const getUsuarios = async (params = {}) => {


    if (params.pageSize === undefined) {
        params.pageSize = 10;
    }


    if (params.page !== undefined) {

        params.offset = (params.page - 1) * params.pageSize

    }

    const response = await axiosInstance.get("/usuarios", { params });
    return response.data;
}


export {
    getUsuarios
}