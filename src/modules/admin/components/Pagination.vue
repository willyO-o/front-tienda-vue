<template>

    <ul class="pagination pagination-dark ">


        <li :class="{ disabled: currentPage == 1 }" class="page-item">
            <a @click="changePage(currentPage - 1)" class="page-link" href="javascript:;" aria-label="Previous">
                <span class="material-symbols-rounded">
                    keyboard_arrow_left
                </span>
                <span class="sr-only">Previous</span>
            </a>
        </li>


        <li v-for="page in totalPages" :key="page" class="page-item" :class="page == currentPage ? 'active' : ''">
            <a v-if="page == currentPage" class="page-link" href="javascript:;">{{ page }} </a>

            <a v-else class="page-link" href="javascript:;" @click="changePage(page)">{{ page }} </a>

        </li>

        <li :class="{ disabled: currentPage == totalPages }" class="page-item">
            <a @click="changePage(currentPage + 1)" class="page-link" href="javascript:;" aria-label="Next">
                <span class="material-symbols-rounded">
                    keyboard_arrow_right
                </span>
                <span class="sr-only">Next</span>
            </a>
        </li>
    </ul>
</template>

<script setup>

import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    total: Number,
    perPage: Number,
    currentPage: Number,
});

const emit = defineEmits(['page-change']);

const totalPages = computed(() => {
    return Math.ceil(props.total / props.perPage);
});


const changePage = (page) => {

    if (page < 1 || page > totalPages.value) {
        return;
    }

    emit('page-change', page);
}




</script>