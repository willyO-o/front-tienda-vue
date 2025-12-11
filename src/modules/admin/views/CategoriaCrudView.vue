<template>
    <div class="col-md-10">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 d-flex justify-content-between">
                    <h6 class="text-white text-capitalize ps-3">Listado de Categorias</h6>
                    <RouterLink class="btn bg-gradient-primary me-3 mb-0" to="/admin/categorias/crear">
                        <i class="fa fa-plus me-2"></i>
                        Crear Categoria
                    </RouterLink>
                </div>
            </div>
            <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Nombre de la Categoria</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Fecha Creacion</th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Estado</th>

                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="categoria in categorias" :key="categoria.id">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <!-- <div>
                                            <img src="/assets/admin/img/team-2.jpg"
                                                class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                                        </div> -->
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{ categoria.categoria }}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="text-xs text-secondary mb-0">{{ categoria.creado_el }}</p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <span class="badge badge-sm "
                                        :class="categoria.estado == 'activo' ? 'bg-gradient-success' : 'bg-gradient-danger'">
                                        {{ categoria.estado }}</span>
                                </td>
                                <td class="align-middle">

                                    <RouterLink :to="`/admin/categorias/editar/${categoria.id}`" class="text-secondary font-weight-bold text-xs mx-2"
                                        data-toggle="tooltip" data-original-title="Edit user">
                                        <i class="fas fa-edit"></i>
                                    </RouterLink>

                                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                        @click="eliminarCategoria(categoria)"
                                        data-toggle="tooltip" data-original-title="Edit user">
                                        <i class="fas fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>



                    <div class="d-flex justify-content-between mt-4">
                        <p class="text-secondary ms-3">
                            Mostrando {{ categorias.length }} de {{ totalCategorias }} Resultados Encontrados
                        </p>
                        <Pagination :currentPage="params.page" :total="totalCategorias" :perPage="params.limit"
                            @page-change="cargarCategorias" />
                        <p></p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>


import { ref, onMounted, reactive } from 'vue'
import { getCategorias ,deleteCategoria} from '@/services/categoriaService';

import Pagination from '@/modules/admin/components/Pagination.vue';

import Swal from 'sweetalert2';

const totalCategorias = ref(0);
const categorias = ref([]);
const params = reactive({
    limit: 10,
    page: 1,
});


const cargarCategorias = async (page = 1) => {
    params.page = page;

    const resultado = await getCategorias(params);

    categorias.value = resultado.data;

    totalCategorias.value = resultado.total;


}


const eliminarCategoria = (item) => {

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
        deleteCategoria(item.id).then(() => {
            Swal.fire(
                'Eliminado!',
                'La categoria ha sido eliminada.',
            )
            cargarCategorias();
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
    cargarCategorias();
});

</script>