<template>


    <li class="nav-item dropdown dropdown-hover mx-2">
        <a class="nav-link ps-2 d-flex cursor-pointer align-items-center font-weight-semibold" id="dropdownMenuPages"
            data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-shopping-cart opacity-6 me-2 text-md"></i>

        </a>
        <div class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
            aria-labelledby="dropdownMenuPages">
            <div v-if="carritoStore.carrito.length > 0" class="">
                <h6 class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1">
                    Carrito
                </h6>


                <div v-for="item in carritoStore.carrito" :key="item.id" class="d-flex px-2 py-1 position-relative">
                    <div>
                        <img :src="getImagenPrincipal(item.imagen)" class="avatar avatar-sm me-3 border-radius-lg"
                            alt="user1">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm ">{{ item.titulo }}</h6>
                        <p class="text-xs text-secondary mb-0">{{ item.cantidad }} x {{ item.precio }}</p>
                        <i class="fa fa-trash text-danger cursor-pointer position-absolute top-0 end-0"
                            @click="carritoStore.eliminarProducto(item.id)"></i>
                    </div>
                </div>

                <div class="border"></div>


                <h6 class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1 mt-1">
                    Total : {{ carritoStore.totalPagar() }} Bs.
                </h6>

                <div class="d-flex justify-content-between text-center">

                    <RouterLink to="/carrito" class="dropdown-item border-radius-md">
                        <i class="fa fa-shopping-cart opacity-6 me-2 text-md"></i>
                        <span>Ver</span>
                    </RouterLink>
                    <div class="vr"></div>

                    <RouterLink to="/carrito" class="dropdown-item border-radius-md">
                        <i class="fas fa-credit-card opacity-6 me-2 text-md"></i>
                        <span>Pagar</span>
                    </RouterLink>

                </div>

            </div>

            <div v-else class="">
                <h6 class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1">
                    No hay productos en el carrito
                </h6>


            </div>



        </div>
    </li>
</template>

<script setup>

import { useCarritoStore } from '@/stores/carritoStore';
import { getImagenPrincipal } from '@/helpers/productoHelper';


const carritoStore = useCarritoStore();


console.log(carritoStore.carrito);

</script>