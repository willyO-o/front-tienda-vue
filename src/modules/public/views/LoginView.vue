<template>

    <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <!-- Section with four info areas left & one card right with image and waves -->
        <section class="py-7">


            <div class="container my-auto bg-s">
                <div class="row">
                    <div class="col-lg-4 col-md-8 col-12 mx-auto">
                        <div class="card z-index-0 fadeIn3 fadeInBottom">
                            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                                    <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Iniciar Sesion</h4>
                                    <div class="row mt-3">
                                        <div class="col-2 text-center ms-auto">
                                            <a class="btn btn-link px-3" href="javascript:;">
                                                <i class="fab fa-facebook text-white text-lg"></i>
                                            </a>
                                        </div>
                                        <div class="col-2 text-center px-1">
                                            <a class="btn btn-link px-3" href="javascript:;">
                                                <i class="fab fa-github text-white text-lg"></i>
                                            </a>
                                        </div>
                                        <div class="col-2 text-center me-auto">
                                            <a class="btn btn-link px-3" href="javascript:;">
                                                <i class="fab fa-google text-white text-lg"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <Form :validation-schema="loginValidationSchema" @submit="iniciarSesion" role="form"
                                    class="text-start">

                                    <div v-show="errorLogin" class="alert alert-primary text-white" role="alert">
                                        <strong>Error!:</strong> Usuario o contraseña incorrectos
                                    </div>



                                    <div class="mb-3">
                                        <div class="input-group input-group-outline ">
                                            <Field type="email" class="form-control" name="email" placeholder="Correo"
                                                v-model="loginState.email" />

                                        </div>
                                        <ErrorMessage name="email" />
                                    </div>


                                    <div class="mb-3">
                                        <div class="input-group input-group-outline ">
                                            <Field type="password" class="form-control" name="password"
                                                v-model="loginState.password" placeholder="Su contraseña" />
                                        </div>
                                        <ErrorMessage name="password" />
                                    </div>


                                    <div class="form-check form-switch d-flex align-items-center mb-3">
                                        <input class="form-check-input" type="checkbox" id="rememberMe" checked
                                            v-model="loginState.rememberMe" />
                                        <label class="form-check-label mb-0 ms-3" for="rememberMe">Recordar
                                            Sesion</label>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" class="btn bg-gradient-dark w-100 my-4 mb-2">
                                            Iniciar Sesion
                                        </button>
                                    </div>
                                    <p class="mt-4 text-sm text-center">
                                        Olvidaste tu contraseña? <a href="javascript:;"
                                            class="text-dark font-weight-bolder">Recuperar</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<script setup>

import { reactive,ref } from 'vue';

import { loginValidationSchema } from '@/modules/public/schemas/loginValidationSchema';

import { login , getDatosUsuario } from '@/services/authService';

import { Form, Field, ErrorMessage } from 'vee-validate';

import { useRouter } from 'vue-router';
const router = useRouter();

const loginState = reactive({
    email: '',
    password: '',
    rememberMe: false
});

const errorLogin = ref(false);

const iniciarSesion = async () => {

    // console.log(loginState);

    try {
        const res = await login(loginState);

        console.log(res);
        errorLogin.value = false;
        //guardar token en localstorage
        localStorage.setItem('token', res.access_token.token);
        console.log(res.access_token.token);
        //redirigir a la pagina de inicio
        localStorage.setItem('refreshToken', JSON.stringify(res.refresh_token.token));


        const datosUsuario = await getDatosUsuario();

        localStorage.setItem('usuario', JSON.stringify(datosUsuario));

        router.push('/Admin');


    } catch (e) {
        errorLogin.value = true;
    }





}



</script>