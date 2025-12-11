<template>

    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <!-- Section with four info areas left & one card right with image and waves -->
        <h2 class="text-center">Productos Disponibles</h2>
        <section class="py-7">
            <div class="container">
                <div class="row align-items-center justify-content-end d-none">
                    <div class="col-md-3">
                        <div class="input-group input-group-outline my-3 ">
                            <input type="email" class="form-control" placeholder="Buscar..." />
                        </div>
                    </div>

                </div>
            </div>

            <div class="container">
                <div class="row align-items-center">


                    <CardProducto v-for="producto in productos" :key="producto.id" :producto="producto" />

                </div>
            </div>
        </section>

    </div>

</template>

<script setup>

import CardProducto from '@/modules/public/components/CardProducto.vue'

import { getProductos } from '@/services/productoService';

import { onBeforeMount, ref } from 'vue';

let productos = ref([]);


const listarProductos = async () => {
    const resultado = await getProductos({ limit: 9 });
    productos.value = resultado.data;
}

onBeforeMount(() => {
    listarProductos();
})

</script>