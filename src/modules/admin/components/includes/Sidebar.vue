<template>
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 z-index-1 bg-white my-2"
        id="sidenav-main">
        <div class="sidenav-header">
            <i class="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true" id="iconSidenav"></i>
            <RouterLink class="navbar-brand px-4 py-3 m-0" to="/">
                <img src="/assets/admin/img/logo-ct-dark.png" class="navbar-brand-img" width="26" height="26"
                    alt="main_logo">
                <span class="ms-1 text-sm text-dark">Mi Tienda</span>
            </RouterLink>
        </div>


        <hr class="horizontal dark mt-0 mb-2">
        <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul class="navbar-nav">

                <hr class="horizontal dark mt-0 mb-2">
                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5">
                        Menu
                    </h6>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link text-dark" exact-active-class="active bg-gradient-dark text-white"
                        to="/admin">
                        <i class="material-symbols-rounded opacity-5">dashboard</i>
                        <span class="nav-link-text ms-1">Dashboard</span>
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link  text-dark" exact-active-class="active bg-gradient-dark text-white"
                        to="/admin/productos">
                        <i class="material-symbols-rounded opacity-5">table_view</i>
                        <span class="nav-link-text ms-1">Productos</span>
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link text-dark" exact-active-class="active bg-gradient-dark text-white"
                        to="/admin/categorias">
                        <i class="material-symbols-rounded opacity-5">receipt_long</i>
                        <span class="nav-link-text ms-1">Categorias</span>
                    </RouterLink>
                </li>

                <!-- <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5">Account pages
                    </h6>
                </li> -->
                <li class="nav-item">
                    <RouterLink class="nav-link text-dark" exact-active-class="active bg-gradient-dark text-white"
                        to="/admin/usuarios">
                        <i class="material-symbols-rounded opacity-5">person</i>
                        <span class="nav-link-text ms-1">Usuarios</span>
                    </RouterLink>
                </li>

            </ul>
        </div>
        <div class="sidenav-footer position-absolute w-100 bottom-0 ">
            <div class="mx-3">
                <div class="card">
                    <div class="card-header mx-4 p-3 text-center">
                        <img class="avatar avatar-xl me-3" :src=" datosUsuario.avatar|| '/assets/img/avatars/user-avatar1.png'" alt="user1">
                    </div>
                    <div class="card-body pt-0 p-3 text-center">
                        <h6 class="text-center mb-0">Usuario</h6>
                        <span class="text-xs">
                            {{ datosUsuario.email }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="mx-3">
                <a class="btn btn-outline-dark mt-4 w-100" target="_blank"
                    href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard?ref=sidebarfree"
                    type="button">Documentation</a>

            </div>
        </div>
    </aside>
</template>

<script setup>

import { ref } from 'vue';

const datosUsuario = ref(JSON.parse(localStorage.getItem('usuario')));

</script>