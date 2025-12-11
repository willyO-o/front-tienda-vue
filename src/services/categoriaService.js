import { axiosInstance } from "@/helpers/axiosInstance";


const getCategorias = async (params = {}) => {

    if (params.pageSize === undefined) {
        params.pageSize = 10;
    }

    if (params.page !== undefined) {
        params.offset = (params.page - 1) * params.pageSize
    }

    const response = await axiosInstance.get("/categorias", { params });
    return response.data;
}


const getCategoriaId = async (id) => {
    
    const response = await axiosInstance.get(`/categorias/${id}`);

    return response.data;
}

const createCategoria = async (data) => {
    
    const response = await axiosInstance.post("/categorias", data);

    return response.data;
}

const updateCategoria = async (id, data) => {
    
    const response = await axiosInstance.put(`/categorias/${id}`, data);

    return response.data;
}

const deleteCategoria  = async (id) => {
    
    const response = await axiosInstance.delete(`/categorias/${id}`);

    return response.data;
}


export {
    getCategorias,
    getCategoriaId,
    createCategoria,
    updateCategoria,
    deleteCategoria
}

