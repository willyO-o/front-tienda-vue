<template>
    <div class="col-12">
        <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">Listado de Usuarios</h6>
                </div>
            </div>
            <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Correo / Usuario</th>
                
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Creado el</th>
                                <th
                                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Estado</th>
                                <th class="text-secondary opacity-7"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                            v-for="usuario in usuarios" :key="usuario.id"
                            >
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img :src=" usuario.avatar|| '/assets/img/avatars/user-avatar1.png'"
                                                class="avatar avatar-sm me-3 border-radius-lg " :alt="`user-${usuario.id}`">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{ usuario.email }}</h6>
                                            <p class="text-xs text-secondary mb-0">{{ usuario.email }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="text-xs font-weight-bold mb-0 text-center">{{ usuario.creado_el }}</p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <span class="badge badge-sm "
                                        :class="usuario.estado == 'activo' ? 'bg-gradient-success' : 'bg-gradient-danger'">
                                    {{ usuario.estado }}</span>
                                </td>
        
                                <td class="align-middle">
                                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                        
                                        data-toggle="tooltip" data-original-title="Edit user">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs mx-2"
                                        data-toggle="tooltip" data-original-title="Edit user">
                                        <i class="fas fa-edit"></i>
                                    </a>

                                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                        data-toggle="tooltip" data-original-title="Edit user">
                                        <i class="fas fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="d-flex justify-content-between mt-4">

                        <p class="text-secondary ms-3">
                            Mostrando {{ usuarios.length }} de {{ totalUsuarios }} Resultados Encontrados
                        </p>
                        <Pagination :currentPage="params.page" :total="totalUsuarios" :perPage="params.limit"
                            @page-change="cargarUsuarios" />
                            <p></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted,reactive } from 'vue'
import { getUsuarios } from '@/services/usuarioService';

import Pagination from '@/modules/admin/components/Pagination.vue';

const totalUsuarios = ref(0);
const usuarios = ref([]);
const params = reactive({
    limit: 10,
    page: 1,
});


const cargarUsuarios = async (page = 1) => {
    params.page = page;
    
    const resultado = await getUsuarios(params);

    usuarios.value = resultado.data;
    totalUsuarios.value = resultado.total;


}

onMounted(() => {
    cargarUsuarios();
});

</script>