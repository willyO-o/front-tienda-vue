<template>

    <div class="col-12">
        <div class="card my-4 p-4">
            <h3>
                {{ datosProducto.id ? 'Editar' : 'Regsitrar' }}
                Producto
            </h3>
            <Form @submit="guardarProducto" :validation-schema="crearProdutoValidationSchema">
                <div class="row">
                    <div class="col-md-6">
                        <div class="input-group input-group-outline my-3">
                            <Field type="text" class="form-control" placeholder="Titulo" name="titulo"
                                v-model="datosProducto.titulo" />
                        </div>
                        <ErrorMessage name="titulo" v-slot="{ message }">
                            <div class="text-danger">{{ message }}</div>
                        </ErrorMessage>
                    </div>
                    <div class="col-md-6">


                        <div class="input-group input-group-static mb-1">
                            <label for="exampleFormControlSelect1" class="ms-0">Categoria</label>
                            <Field class="form-control" id="exampleFormControlSelect1" as="select" name="categoria_id"
                                v-model="datosProducto.categoria_id">
                                <option selected value="0">Seleccione una categoria</option>
                                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                                    {{ categoria.categoria }}
                                </option>
                            </Field>
                        </div>
                        <ErrorMessage name="categoria_id" v-slot="{ message }">
                            <div class="text-danger">{{ message }}</div>
                        </ErrorMessage>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="input-group input-group-outline my-3">
                            <Field type="number" class="form-control" name="precio" v-model="datosProducto.precio"
                                placeholder="Precio" />
                        </div>
                        <ErrorMessage name="precio" v-slot="{ message }">
                            <div class="text-danger">{{ message }}</div>
                        </ErrorMessage>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group input-group-outline  my-3">
                            <Field type="number" class="form-control" name="stock" v-model="datosProducto.stock"
                                placeholder="Stock Inicial" />
                        </div>
                        <ErrorMessage name="stock" v-slot="{ message }">
                            <div class="text-danger">{{ message }}</div>
                        </ErrorMessage>
                    </div>

                    <div class="col-12">
                        <div class="input-group input-group-outline my-3">
                            <Field type="text" class="form-control" as="textarea" rows="5" name="descripcion"
                                v-model="datosProducto.descripcion" placeholder="Descripcion" />
                        </div>
                        <ErrorMessage name="descripcion" v-slot="{ message }">
                            <div class="text-danger">{{ message }}</div>
                        </ErrorMessage>
                    </div>

                    <label for=""> Imagenes</label>
                    <div class="col-12 d-flex justify-content-between">
                        <div class="input-group input-group-outline my-0">
                            <input type="text" class="form-control" name="imagen" v-model="campoImagen"
                                placeholder="https://www.imagen.com/imagen.jpg" />
                        </div>
                        <button class="btn btn-info btn-sm my-0  text-nowrap pe-4" @click="agregarImagen"
                            :disabled="campoImagen.length == 0">
                            <i class="fas fa-plus me-1"></i> Agregar Imagen

                        </button>

                    </div>
                    <div v-if="listadoImagenes.length == 0" class="text-danger">
                        Ingrese almenos una imagen
                    </div>

                    <div class="col-12 d-flex justify-content-between">

                        <div class="row">

                            <div v-for="(imagen, index) in listadoImagenes" :key="index"
                                class="col-auto col-lg-2 col-md-3">
                                <div class="card card-blog card-plain">
                                    <div class="card-header p-0 m-2 position-relative">
                                        <span @click="quitarImagen(index)"
                                            class="badge bg-gradient-danger cursor-pointer position-absolute top-0 end-0 mt-2 me-2">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                        <a class="d-block shadow-xl border-radius-xl">
                                            <img :src="imagen" alt="img-blur-shadow"
                                                class="img-fluid shadow border-radius-lg">
                                        </a>
                                    </div>
                                </div>
                            </div>


                            <div v-if="listadoImagenes.length == 0" class="col-12">
                                <div class="card  card-plain">
                                    <div class="card-header p-0 m-2 ">

                                    </div>
                                    <div class="card-body p-3">
                                        <a href="javascript:;">
                                            <h5 class="text-cente">
                                                Sin Imagenes Agregadas
                                            </h5>
                                        </a>


                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>

                    <div class="justify-content-end d-flex">
                        <button type="submit" class="btn btn-dark mt-4 w-25">
                            <i class="fas fa-save me-1"></i>
                            Guardar Producto
                        </button>
                    </div>

                </div>
            </form>

        </div>
    </div>

</template>

<script setup>

import { crearProdutoValidationSchema } from '@/modules/admin/schemas/crearProdutoValidationSchema';
import { Form, Field, ErrorMessage } from 'vee-validate';


import { reactive, ref, onBeforeMount } from 'vue';

import { getCategorias } from '@/services/categoriaService';

import { createProducto, getProductoId, updateProducto } from '@/services/productoService';

import { useRouter } from 'vue-router';



import Swal from 'sweetalert2';


const router = useRouter();

const datosProducto = reactive({
    id: 0,
    titulo: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria_id: 0,
    imagen: '',
});

const categorias = ref([]);

let listadoImagenes = ref([]);

const campoImagen = ref('');


const agregarImagen = () => {



    listadoImagenes.value.push(campoImagen.value);
    campoImagen.value = '';
}


const quitarImagen = (index) => {
    listadoImagenes.value.splice(index, 1);
}

onBeforeMount(async () => {
    const resultado = await getCategorias();
    categorias.value = resultado.data;

    datosProducto.id = router.currentRoute.value.params.id;


    if (datosProducto.id) {

        const resultadoProducto = await getProductoId(datosProducto.id);

        datosProducto.titulo = resultadoProducto.titulo;
        datosProducto.descripcion = resultadoProducto.descripcion;
        datosProducto.precio = resultadoProducto.precio;
        datosProducto.stock = resultadoProducto.stock;
        datosProducto.categoria_id = resultadoProducto.categoria_id;
        listadoImagenes.value = (resultadoProducto.imagen);

    }

});


const guardarProducto = async () => {

    if (!datosProducto.stock) {
        datosProducto.stock = 0;
    }

    if (listadoImagenes.value.length == 0) {

        return;
    }

    // datosProducto.imagen = JSON.stringify(listadoImagenes.value);
    datosProducto.imagen = listadoImagenes.value; 

    try {

        if (datosProducto.id) {
            await updateProducto(datosProducto.id, datosProducto);

        } else {
            await createProducto(datosProducto);
        }

        Swal.fire({
            title: 'Exito!',
            text: 'El producto se ha guardado correctamente.',
            icon: 'success',
            confirmButtonText: 'ok'
        })
        router.push('/admin/productos');

    } catch (e) {

        Swal.fire({
            title: 'Error!',
            text: e.request.responseText,
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }



}



</script>