<template>


    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <ol class="carousel-indicators">
            <li v-for="(imagen, index) in getImagenes" :key="index" data-target="#carouselExampleIndicators"
                :data-bs-slide-to="index" :class="index == 0 ? 'active' : ''"></li>
        </ol>
        <div class="carousel-inner">
            <div v-for="(imagen, index) in getImagenes" :key="index" class="carousel-item "
                :class="index == 0 ? 'active' : ''">
                <img class="d-block w-100" :src="imagen" alt="First slide">
            </div>

        </div>
        <a class="carousel-control-prev " href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon " aria-hidden="true"></span>
            <span class="sr-only">Anterior</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Siguiente</span>
        </a>
    </div>


</template>


<script setup>

import { defineProps, computed } from 'vue';


const props = defineProps({
    imagenes: {
        type: [String, Object],
        default: ''
    }
});



const getImagenes = computed(() => {

    if (typeof props.imagenes == 'object') {
        return props.imagenes;
    }

    const arrImg = JSON.parse(props.imagenes || '[]') || [];

    return arrImg;

});



</script>