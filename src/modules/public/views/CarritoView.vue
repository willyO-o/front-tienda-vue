<template>



    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <!-- Section with four info areas left & one card right with image and waves -->
        <h2 class="text-center">Detalles del Carrito</h2>
        <section class="py-7">

            <div class="container">
                <div class="row align-items-center">

                    <div class="col-md-9">
                        <div class="card">
                            <div class="table-responsive">
                                <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Producto</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Precio / Unidad</th>
                                            <th
                                                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Cantidad</th>
                                            <th
                                                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Sub-Total</th>
                                            <th class="text-secondary opacity-7"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="item in carritoStore.carrito" :key="item.id">
                                            <td>
                                                <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img :src="getImagenPrincipal(item.imagen)"
                                                            class="avatar avatar-sm me-3">
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-xs">
                                                            {{ item.titulo }}
                                                        </h6>
                                                        <!-- <p class="text-xs text-secondary mb-0">john@creative-tim.com</p> -->
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0">
                                                    {{ item.precio }} Bs.
                                                </p>
                                            </td>
                                            <td class="align-middle text-center text-sm">
                                                    <div class="d-flex justify-content-between p-0  w-50 mx-auto">
                                                        <a href="javascript:;"
                                                            class="btn btn-sm btn-icon bg-gradient-dark mb-0"
                                                            @click="restarCantidad(item)">
                                                            <i class="material-symbols-rounded my-auto">remove</i>
                                                        </a>
                                                        <div class="input-group input-group-outline">
                                                            <input type="email" class="form-control form-control-sm"
                                                                :value="item.cantidad">
                                                        </div>
                                                        <a href="javascript:;"
                                                            class="btn btn-sm btn-icon bg-gradient-dark mb-0"
                                                            @click="agregarCantidad(item)">
                                                            <i class="material-symbols-rounded my-auto">
                                                                add
                                                            </i>

                                                        </a>
                                                    </div>

                                            </td>
                                            <td class="align-middle text-center">
                                                <span class="text-secondary text-xs font-weight-normal">
                                                    {{ item.cantidad * item.precio }} Bs.
                                                </span>
                                            </td>
                                            <td class="align-middle">
                                                <a href="javascript:;" class="text-secondary font-weight-normal text-xs"
                                                    data-toggle="tooltip" data-original-title="Edit user">
                                                    <i class="fas fa-trash text-danger cursor-pointer "
                                                        @click="carritoStore.eliminarProducto(item.id)"></i>


                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="card shadow-lg p">
                            <span class="badge rounded-pill bg-light text-dark w-30 mt-n2 mx-auto">
                            </span>
                            <div class="card-header ms-4 pt-4 pb-3">
                                <h2>
                                    Resumen
                                </h2>
                                <hr class="border">
                                <h2 class="font-weight-bold mt-2">
                                </h2>
                            </div>
                            <div class="card-body text-lg-start text-center pt-0">
                                <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                    <i class="material-symbols-rounded my-auto">done</i>
                                    <span class="ps-3">
                                        Total: {{ carritoStore.totalPagar() }} Bs.
                                    </span>
                                </div>




                                <a href="javascript:;" class="btn btn-icon bg-gradient-light d-lg-block mt-3 mb-0">

                                    <i class="fas fa-credit-card me-1"></i>
                                    Pagar
                                </a>


                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </section>

    </div>

</template>


<script setup>

import { ref } from 'vue';

import { useCarritoStore } from '@/stores/carritoStore';

import { getImagenPrincipal } from '@/helpers/productoHelper';

const carritoStore = useCarritoStore();


const agregarCantidad = (item) => {
    carritoStore.agregarProducto(item, 1);

}

const restarCantidad = (item) => {
    carritoStore.agregarProducto(item, -1);
}

</script>