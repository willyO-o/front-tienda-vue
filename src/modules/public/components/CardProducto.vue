<template>

    <div class="col-lg-4 mt-lg-0 mt-4">
        <div class="card">
            <div class="card-header p-0 position-relative mt-2 mx-2 z-index-2">

                <a class="d-block blur-shadow-image position-relative">
                    <span class="badge bg-gradient-dark position-absolute end-0 mt-3 me-3">{{ producto.categoria
                        }}</span>

                    <img :src="getImagenPrincipal(producto.imagen)" alt="img-colored-shadow"
                        class="img-fluid border-radius-lg">
                </a>
            </div>
            <div class="card-body text-center">
                <h5 class="font-weight-normal">
                    <RouterLink :to="{ name: 'Producto', params: { id: producto.id } }">
                        {{ producto.titulo }}
                    </RouterLink>
                </h5>
                <h5 class="font-weight-blod text-dark mb-3">
                    Bs. {{ producto.precio }}
                </h5>
                <p class="mb-0">
                    {{
                        recortarTexto(producto.descripcion, 80)
                    }}
                </p>
                <button v-if="producto.stock > carritoStore.cantidadProducto(producto.id)" type="button"
                    class="btn bg-gradient-info btn-sm mb-0 mt-3" @click="carritoStore.agregarProducto(producto)">
                    <i class="fa fa-shopping-cart me-2"></i>
                    Agregar al carrito
                </button>
                <button v-else type="button" class="btn bg-gradient-info btn-sm mb-0 mt-3" disabled>
                    <i class="fa fa-shopping-cart me-2"></i>
                    Sin Existencias
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { defineProps } from 'vue';
import { getImagenPrincipal, recortarTexto } from '@/helpers/productoHelper';

import { useCarritoStore } from '@/stores/carritoStore';

const props = defineProps({
    producto: Object
});


const carritoStore = useCarritoStore();






</script>