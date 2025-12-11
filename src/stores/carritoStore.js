import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useCarritoStore = defineStore('carrito', () => {

    const carrito = ref(cargarCarrito())


    function cargarCarrito() {
        const carrito = localStorage.getItem('carrito');
        return JSON.parse(carrito) || [];
    }

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito.value));
    }

    function agregarProducto(producto, cantidad = 1) {

        // console.log(producto);

        const existeProducto = carrito.value.find(p => p.id === producto.id);
        if (existeProducto) {
            if(existeProducto.cantidad + cantidad > Number(producto.stock)){
                existeProducto.cantidad = Number(producto.stock);
            }else{
                existeProducto.cantidad += cantidad;
            }
        } else {
            carrito.value.push({
                id: producto.id,
                titulo: producto.titulo,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: cantidad
            });
        }

        guardarCarrito();
    }

    function eliminarProducto(id) {
        carrito.value = carrito.value.filter(p => p.id !== id);
        guardarCarrito();
    }

    function vaciarCarrito() {
        carrito.value = [];
        guardarCarrito();
    }

    function cantidadProducto(id){
        const producto = carrito.value.find(p => p.id === id);
        return producto ? producto.cantidad : 0;
    }

    function totalPagar (){
        return carrito.value.reduce((total, p) => total + p.precio * p.cantidad, 0);
    }

    return {
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        cantidadProducto,
        totalPagar

    }


})
