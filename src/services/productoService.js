import { axiosInstance } from "@/helpers/axiosInstance";


const getProductos = async (params = {}) => {

    if (params.limit === undefined) {
        params.limit = 9;
    }


    if (params.page !== undefined) {

        params.offset = (params.page - 1) * params.limit

    }


    const response = await axiosInstance.get("/productos", { params });

    return response.data;

};

const getProductoId = async (id) => {

    const response = await axiosInstance.get(`/productos/${id}`);

    return response.data;
}



const createProducto = async (data) => {
    
    const response = await axiosInstance.post("/productos", data);

    return response.data;

}


const updateProducto = async (id, data) => {
    
    const response = await axiosInstance.put(`/productos/${id}`, data);

    return response.data;

}



const deleteProducto  = async (id) => {

    const response = await axiosInstance.delete(`/productos/${id}`);

    return response.data;
}


export {
    getProductos,
    getProductoId,
    createProducto,
    updateProducto,
    deleteProducto,
};