<template>


    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <!-- Section with four info areas left & one card right with image and waves -->
        <h2 class="text-center">Detalles del Producto</h2>
        <section class="py-7">

            <div class="container">
                <div v-if="producto.id" class="row align-items-center">

                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-8 mx-auto">
                                <Carrousel
                                    :imagenes="producto.imagen"
                                />
                            </div>
                        </div>

                    </div>
                    <div class="col-md-6">

                        <div class="card shadow-lg p">
                            <span class="badge rounded-pill bg-light text-dark w-30 mt-n2 mx-auto">
                                {{ producto.categoria }}
                            </span>
                            <div class="card-header ms-4 pt-4 pb-3">
                                <h2>
                                    {{ producto.titulo }}
                                </h2>
                                <hr class="border">
                                <h2 class="font-weight-bold mt-2">
                                    Bs. {{ producto.precio }}
                                </h2>
                            </div>
                            <div class="card-body text-lg-start text-center pt-0">
                                <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                    <i class="material-symbols-rounded my-auto">done</i>
                                    <span class="ps-3">
                                        Disponible: {{ producto.stock }} unidades
                                    </span>
                                </div>


                                <div class="row ms-2">
                                    <div class="d-flex justify-content-between p-0 col-md-3">
                                        <a href="javascript:;" class="btn btn-sm btn-icon bg-gradient-dark mb-0"
                                            @click="restarCantidad">
                                            <i class="material-symbols-rounded my-auto">remove</i>
                                        </a>
                                        <div class="input-group input-group-outline">
                                            <input type="email" class="form-control form-control-sm" v-model="cantidad">
                                        </div>
                                        <a href="javascript:;" class="btn btn-sm btn-icon bg-gradient-dark mb-0"
                                            @click="agregarCantidad">
                                            <i class="material-symbols-rounded my-auto">
                                                add
                                            </i>

                                        </a>
                                    </div>
                                </div>


                                <div class="row  justify-content-between">

                                    <div class="col-md-6">

                                        <a href="javascript:;" class="btn  btn-icon bg-gradient-dark d-block mt-3 mb-0"
                                            @click="carritoStore.agregarProducto(producto, cantidad)">
                                            <i class="fas fa-shopping-cart me-1"></i>
                                            
                                            Agregar al Carrito
                                        </a>

                                    </div>
                                    <div class="col-md-6">
                                        <a href="javascript:;"
                                            class="btn btn-icon bg-gradient-light d-lg-block mt-3 mb-0">

                                            <i class="fas fa-credit-card me-1"></i>
                                            Comprar Producto
                                        </a>
                                    </div>





                                </div>

                            </div>
                        </div>
                    </div>


                    <div class="col-12">
                        <div class="card shadow-lg mt-4 p-4">
                            <div class="card-header">
                                <h3>Descripción</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    {{ producto.descripcion }}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </div>

</template>

<script setup>

import { getProductoId } from '@/services/productoService';

import {useCarritoStore} from '@/stores/carritoStore';


import Carrousel from '@/modules/public/components/Carrousel.vue';


import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter();

const producto = ref({});

const cantidad = ref(1);

const carritoStore = useCarritoStore();

const cargarProducto = async () => {
    const id = router.currentRoute.value.params.id;
    const response = await getProductoId(id);
    producto.value = response;


}


const agregarCantidad = () => {
    if (producto.value.stock > cantidad.value) {
        cantidad.value++;
    }
}

const restarCantidad = () => {
    if (cantidad.value > 1) {
        cantidad.value--;
    }
}


const imagenes = () => {

    if ( typeof producto.value.imagen == 'object') {
        return producto.value.imagen;
    }
    const arrImg = JSON.parse(producto.value.imagen) || [];

    return arrImg;
}

onBeforeMount(() => {
    cargarProducto();
});










</script>