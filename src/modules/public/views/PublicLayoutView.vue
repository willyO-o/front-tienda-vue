<template>


    <NavBar />


    <Header>
        <div class="container">
            <div class="row">
                <div class="col-lg-7 text-center mx-auto">
                    <h1 class="text-white font-weight-black pt-3 mt-n5">Mi Tienda</h1>
                    <p class="lead text-white mt-3">
                        Bienvenido a Mi Tienda, la plataforma de comercio electronico mas grande de Bolivia.
                        <br />
                    </p>

                    <RouterLink to="/tienda" class="btn bg-white text-dark">Ver Tienda</RouterLink>

                </div>
            </div>
        </div>
    </Header>



    <RouterView />

    <FooterPage />



</template>

<script setup>

import NavBar from '@/modules/public/components/includes/NavBar.vue'

import Header from '@/modules/public/components/includes/Header.vue'

import FooterPage from '@/modules/public/components/includes/FooterPage.vue'


import Chatbot from '@/components/Chatbot.vue';
</script>