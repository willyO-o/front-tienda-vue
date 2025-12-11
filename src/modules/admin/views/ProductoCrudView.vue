<template>
    <div class="col-12 MT-5">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between">
                    <h6 class="text-white text-capitalize ps-3">Listado de Productos</h6>
                    <RouterLink class="btn bg-gradient-primary me-3 mb-0" to="/admin/productos/crear">
                        <i class="fa fa-plus me-2"></i>
                        Crear Producto
                    </RouterLink>
                </div>
            </div>
            <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Producto</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Categoria</th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Stock</th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Precio Unitario</th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Fecha Registro</th>

                                <th class="text-secondary opacity-7">

                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="producto in productos" :key="producto.id">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img :src="getImagenPrincipal(producto.imagen)"
                                                class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">
                                                {{ producto.titulo }}
                                            </h6>
                                            <!-- <p class="text-xs text-secondary mb-0">john@creative-tim.com</p> -->
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0">
                                        {{ producto.categoria }}
                                    </p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <span class="badge badge-sm "
                                        :class="producto.stock > 1 ? 'bg-gradient-success' : 'bg-gradient-danger'">
                                        {{ producto.stock }} unidades
                                    </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">
                                        Bs. {{ producto.precio }}
                                    </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">
                                        {{ producto.creado_el }}
                                    </span>
                                </td>
                                <td class="align-middle">
                                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                        @click="verProducto(producto)" data-toggle="tooltip"
                                        data-original-title="Edit user">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <!-- <RouterLink :to="`/admin/productos/editar${producto.id}`" class="text-secondary font-weight-bold text-xs mx-2" -->
                                    <RouterLink :to="{ name: 'EditarProducto', params: { id: producto.id } }"
                                        class="text-secondary font-weight-bold text-xs mx-2" data-toggle="tooltip"
                                        data-original-title="Edit user">
                                        <i class="fas fa-edit"></i>
                                    </RouterLink>

                                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                        @click="eliminarProducto(producto)" data-toggle="tooltip"
                                        data-original-title="Edit user">
                                        <i class="fas fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>

                    </table>

                    <div class="d-flex justify-content-between mt-4">

                        <p class="text-secondary ms-3">
                            Mostrando {{ productos.length }} de {{ totalProductos }} Resultados Encontrados
                        </p>
                        <Pagination :currentPage="params.page" :total="totalProductos" :perPage="params.pageSize"
                            @page-change="cargarProductos" />

                        <div></div>
                    </div>

                </div>
            </div>
        </div>
    </div>



    <!-- Modal -->
    <div class="modal fade 
    " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-normal" id="exampleModalLabel">Detalles del Producto</h5>
                    <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 mb-4">
                            <div class="">

                                <div class="row justify-content-center">

                                    <div class="col-md-6">
                                        <Carrousel :imagenes="productoFocus.imagen" />

                                    </div>
                                </div>

                                <span class="badge rounded-pill bg-light text-dark w-30 mt-n2 mx-auto"></span>
                                <div class="card-header text-center pt-4 pb-3">
                                    <h3 class="font-weight-bold mt-2">
                                        {{ productoFocus.titulo }}

                                    </h3>
                                </div>
                                <div class="card-header text-center pt-4 pb-3">
                                    <h1 class="font-weight-bold mt-2">
                                        <small class="text-lg mb-auto">Bs.</small>{{ productoFocus.precio }}
                                    </h1>
                                </div>
                                <div class="card-body text-lg-start text-center pt-0">

                                    <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                        <h6>
                                            <i class="fas fa-tag my-auto"></i>

                                            Categoría
                                        </h6>
                                        <span class="ps-3">{{ productoFocus.categoria }} </span>
                                    </div>
                                    <h6>
                                        <i class="fas fa-info-circle my-auto"></i>
                                        Descripción
                                    </h6>
                                    <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                        <span class="ps-3">
                                            {{ productoFocus.descripcion }}
                                        </span>
                                    </div>

                                    <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                        <h6>
                                            <i class="fas fa-box my-auto"></i>
                                            Stock:
                                        </h6>
                                        <span class="ps-3">{{ productoFocus.stock }} Unidades Displonibles </span>
                                    </div>

                                    <div class="d-flex justify-content-lg-start justify-content-center p-2">
                                        <h6>
                                            <i class="fas fa-calendar my-auto"></i>
                                            Fecha de Registro:
                                        </h6>
                                        <span class="ps-3">{{ productoFocus.creado_el || "-" }} </span>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { getProductos, deleteProducto } from '@/services/productoService';
import { onMounted, ref, reactive } from 'vue';

import { getImagenPrincipal } from '@/helpers/productoHelper';

import Pagination from '@/modules/admin/components/Pagination.vue';

//importar modal de bootstrap

import * as  bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Carrousel from '@/modules/public/components/Carrousel.vue';

import Swal from 'sweetalert2';


const productos = ref([]);
const totalProductos = ref(0);

const productoFocus = ref({
    id: 0,
    titulo: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: '',
    imagen: '',
    creado_el: '',
});
var myModal = null;
const params = reactive({
    pageSize: 10,
    page: 1,
});


const verProducto = (producto) => {
    productoFocus.value = producto;

    myModal.show();



}


const cargarProductos = async (page = 1) => {
    params.page = page;
    const resultado = await getProductos(params);
    productos.value = resultado.data;
    totalProductos.value = resultado.total;
}

const eliminarProducto = (producto) => {

    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProducto(producto.id).then(() => {
                Swal.fire(
                    'Eliminado!',
                    'El producto ha sido eliminado.',
                )
                cargarProductos();
            }).catch((e) => {
                Swal.fire({
                    title: 'Error!',
                    text: e.request.responseText,
                    icon: 'error',
                    confirmButtonText: 'ok'
                })
            })


        }
    })

}

onMounted(() => {
    cargarProductos();

    myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
    });
});

</script>