<template>

    <div class="col-md-6">
        <div class="card my-4 p-4">
            <h3>
                {{ datosCategoria.id ? 'Editar' : 'Regsitrar' }}
                Categoria
            </h3>
            <Form @submit="guardarCategoria" :validation-schema="crearCategoriaValidationSchema">
                <div class="row">
                    <div class="col-md-6">
                        <div class="input-group input-group-outline my-3">
                            <Field type="text" class="form-control" placeholder="Nombre de la Categoria"
                                name="categoria" v-model="datosCategoria.categoria" />
                        </div>
                        <ErrorMessage name="categoria" v-slot="{ message }">
                            <div class="text-danger">{{ message }}</div>
                        </ErrorMessage>
                    </div>

                </div>
                <div class="row">
                    <label for="">Estado </label>
                    <div class="col-md-6">
                        <div class="form-check mb-0">
                            <Field class="form-check-input" type="radio" name="estado" id="customRadio1"
                                value="activo" v-model="datosCategoria.estado" />
                            <label class="custom-control-label" for="customRadio1">Activo</label>
                        </div>
                        <div class="form-check">
                            <Field class="form-check-input" type="radio" name="estado" id="customRadio2"
                                value="inactivo" v-model="datosCategoria.estado" />
                            <label class="custom-control-label" for="customRadio2">inactivo</label>
                        </div>


                        <ErrorMessage name="estado" v-slot="{ message }">
                            <div class="text-danger">{{ message }}</div>
                        </ErrorMessage>
                    </div>

                </div>

                <div class="justify-content-end d-flex">
                    <button type="submit" class="btn btn-dark mt-4 w-25">
                        <i class="fas fa-save me-1"></i>
                        Guardar Categoria
                    </button>
                </div>

            </form>

        </div>
    </div>

</template>

<script setup>

import { crearCategoriaValidationSchema } from '@/modules/admin/schemas/crearCategoriaValidationSchema';
import { Form, Field, ErrorMessage } from 'vee-validate';


import { reactive, ref, onBeforeMount } from 'vue';

import { createCategoria,getCategoriaId,updateCategoria } from '@/services/categoriaService';


import { useRouter } from 'vue-router';



import Swal from 'sweetalert2';


const router = useRouter();

const datosCategoria = reactive({
    id: 0,
    categoria: '',
    estado: 'activo',
});







onBeforeMount(async () => {


    datosCategoria.id = router.currentRoute.value.params.id;


    if (datosCategoria.id) {

        const resultadoCategoria = await getCategoriaId(datosCategoria.id);

        datosCategoria.categoria = resultadoCategoria.categoria;
        datosCategoria.estado = resultadoCategoria.estado;

    }

});


const guardarCategoria = async () => {



    try {

        if (datosCategoria.id) {
            await updateCategoria(datosCategoria.id, datosCategoria);

        } else {
            await createCategoria(datosCategoria);
        }

    } catch (e) {

        Swal.fire({
            title: 'Error!',
            text: e.request.responseText,
            icon: 'error',
            confirmButtonText: 'ok'
        })

        return
    }


    router.push('/admin/categorias');

}



</script>