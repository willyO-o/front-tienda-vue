<template>


    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <!-- Section with four info areas left & one card right with image and waves -->
        <h2 class="text-center">Nuevos Productos</h2>
        <section class="py-7">

            <div class="container">
                <div   class="row align-items-center">


                    <CardProducto  v-for="item in productos" :key="item.id" :producto="item" />


                </div>
            </div>
        </section>
        <!-- END Section with four info areas left & one card right with image and waves -->
        <!-- -------- START Features w/ pattern background & stats & rocket -------- -->
        <section class="pb-5 position-relative bg-gradient-dark mx-n3">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 text-start mb-5 mt-5">
                        <h3 class="text-white z-index-1 position-relative">
                            Reseñas de nuestros clientes
                        </h3>
                        <p class="text-white opacity-8 mb-0">
                            A continuación te presentamos algunas reseñas de nuestros clientes.

                            </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-12">
                        <div class="card card-profile mt-4">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-12 mt-n5">
                                    <a href="javascript:;">
                                        <div class="p-3 pe-md-0">
                                            <img class="w-100 border-radius-md shadow-lg" src="/assets/img/team-5.jpg"
                                                alt="image">
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-8 col-md-6 col-12 my-auto">
                                    <div class="card-body ps-lg-0">
                                        <h5 class="mb-0">Emma Roberts</h5>
                                        <h6 class="text-info">
                                            Cliente
                                        </h6>
                                        <p class="mb-0">
                                            El envio fue rapido y el producto llego en perfectas condiciones.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12">
                        <div class="card card-profile mt-lg-4 mt-5">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-12 mt-n5">
                                    <a href="javascript:;">
                                        <div class="p-3 pe-md-0">
                                            <img class="w-100 border-radius-md shadow-lg"
                                                src="/assets/img/bruce-mars.jpg" alt="image">
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-8 col-md-6 col-12 my-auto">
                                    <div class="card-body ps-lg-0">
                                        <h5 class="mb-0">William Pearce</h5>
                                        <h6 class="text-info">Cliente</h6>
                                        <p class="mb-0">
                                            Los productos son de calidad y el servicio es excelente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-lg-6 col-12">
                        <div class="card card-profile mt-4 z-index-2">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-12 mt-n5">
                                    <a href="javascript:;">
                                        <div class="p-3 pe-md-0">
                                            <img class="w-100 border-radius-md shadow-lg"
                                                src="/assets/img/ivana-squares.jpg" alt="image">
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-8 col-md-6 col-12 my-auto">
                                    <div class="card-body ps-lg-0">
                                        <h5 class="mb-0">Ivana Flow</h5>
                                        <h6 class="text-info">Cliente</h6>
                                        <p class="mb-0">
                                            La atencion al cliente es excelente, responden rapido y de forma eficiente.
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12">
                        <div class="card card-profile mt-lg-4 mt-5 z-index-2">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-12 mt-n5">
                                    <a href="javascript:;">
                                        <div class="p-3 pe-md-0">
                                            <img class="w-100 border-radius-md shadow-lg"
                                                src="/assets/img/ivana-square.jpg" alt="image">
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-8 col-md-6 col-12 my-auto">
                                    <div class="card-body ps-lg-0">
                                        <h5 class="mb-0">Marquez Garcia</h5>
                                        <h6 class="text-info">Cliente</h6>
                                        <p class="mb-0">
                                            La garantia de los productos es excelente, tuve un problema con un producto y me lo
                                            cambiaron sin problemas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- -------- END Features w/ pattern background & stats & rocket -------- -->
        <section class="pt-4 pb-6" id="count-stats">
            <div class="container">
                <div class="row mb-7">
                    <div class="col-lg-2 col-md-4 col-6 mb-4">
                        <img class="w-100 opacity-7" src="/assets/img/logos/gray-logos/logo-coinbase.svg" alt="logo">
                    </div>
                    <div class="col-lg-2 col-md-4 col-6 mb-4">
                        <img class="w-100 opacity-7" src="/assets/img/logos/gray-logos/logo-nasa.svg" alt="logo">
                    </div>
                    <div class="col-lg-2 col-md-4 col-6 mb-4">
                        <img class="w-100 opacity-7" src="/assets/img/logos/gray-logos/logo-netflix.svg" alt="logo">
                    </div>
                    <div class="col-lg-2 col-md-4 col-6 mb-4">
                        <img class="w-100 opacity-7" src="/assets/img/logos/gray-logos/logo-pinterest.svg" alt="logo">
                    </div>
                    <div class="col-lg-2 col-md-4 col-6 mb-4">
                        <img class="w-100 opacity-7" src="/assets/img/logos/gray-logos/logo-spotify.svg" alt="logo">
                    </div>
                    <div class="col-lg-2 col-md-4 col-6 mb-4">
                        <img class="w-100 opacity-7" src="/assets/img/logos/gray-logos/logo-vodafone.svg" alt="logo">
                    </div>
                </div>
                <div class="row justify-content-center text-center">
                    <div class="col-md-3">
                        <h1 class="text-gradient text-info" id="state1" countTo="5234">+26</h1>
                        <h5>Categorias</h5>
                        <p>
                            Contamos con una amplia gama de productos en diferentes categorias para que puedas elegir el que mas te guste.
                        </p>
                    </div>
                    <div class="col-md-3">
                        <h1 class="text-gradient text-info"><span id="state2" countTo="3400">+500</span></h1>
                        <h5>Prductos</h5>
                        <p>
                            Contamos con una amplia gama de productos en diferentes categorias para que puedas elegir el que mas te guste.
                        </p>
                    </div>
                    <div class="col-md-3">
                        <h1 class="text-gradient text-info"><span id="state3" countTo="24">24</span>/7</h1>
                        <h5>Soporte</h5>
                        <p>
                            Contamos con un equipo de atencion al cliente que estara dispuesto a ayudarte en lo que necesites.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <!-- -------- START PRE-FOOTER 1 w/ SUBSCRIBE BUTTON AND IMAGE ------- -->
        <section class="my-5 pt-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 m-auto">
                        <h4>Suscribete nuestro NewSletter</h4>
                        <p class="mb-4">
                            Recibe las ultimas noticias y ofertas en tu correo electronico.
                        </p>
                        <div class="row">
                            <div class="col-8">
                                <div class="input-group input-group-outline">
                                    <label class="form-label">Su correo Electronico...</label>
                                    <input type="text" class="form-control mb-sm-0">
                                </div>
                            </div>
                            <div class="col-4 ps-0">
                                <button type="button"
                                    class="btn bg-gradient-info mb-0 h-100 position-relative z-index-2">Suscribirse</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 ms-auto">
                        <div class="position-relative">
                            <img class="max-width-50 w-100 position-relative z-index-2" src="/assets/img/macbook.png"
                                alt="image">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- -------- END PRE-FOOTER 1 w/ SUBSCRIBE BUTTON AND IMAGE ------- -->
    </div>

    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">



        <!-- -------   START PRE-FOOTER 2 - simple social line w/ title & 3 buttons    -------- -->
        <div class="py-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 ms-auto">
                        <h4 class="mb-1">
                            Gracias por visitarnos!
                        </h4>
                        <p class="lead mb-0">
                            Puedes seguirnos en nuestras redes sociales.
                        </p>
                    </div>
                    <div class="col-lg-5 me-lg-auto my-lg-auto text-lg-end mt-5">
                        <a href="https://twitter.com/intent/tweet?text=Check%20Material%20UI%20Kit%20made%20by%20%40CreativeTim%20%23webdesign%20%23designsystem%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-kit"
                            class="btn btn-twitter mb-0 me-2" target="_blank">
                            <i class="fab fa-twitter me-1"></i> Twtter
                        </a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-kit"
                            class="btn btn-facebook mb-0 me-2" target="_blank">
                            <i class="fab fa-facebook-square me-1"></i> Facebook
                        </a>
                        <a href="https://www.pinterest.com/pin/create/button/?url=https://www.creative-tim.com/product/material-kit"
                            class="btn btn-pinterest mb-0 me-2" target="_blank">
                            <i class="fab fa-youtube me-1"></i> Youtube
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- -------   END PRE-FOOTER 2 - simple social line w/ title & 3 buttons    -------- -->


    </div>
</template>

<script setup>

import CardProducto from '@/modules/public/components/CardProducto.vue'

import { getProductos } from '@/services/productoService';

import { ref, onBeforeMount } from 'vue';

const productos = ref([]);

const listarProductos = async () => {
    const resultado = await getProductos({ limit: 3 });

    productos.value = resultado.data;
}

onBeforeMount( () => {
    listarProductos();
})




</script>