<template>
    <section>
        <div class="page-header min-vh-100">
            <div class="container">
                <div class="row">
                    <div
                        class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                        <div class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                            style="background-image: url('https://images.unsplash.com/photo-1579541764764-6401d4100dd7?q=80&w=1400&auto=format&fit=crop'); background-size: cover;"
                            loading="lazy"></div>
                    </div>
                    <div class="col-xl-5 col-lg-6 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                        <div class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5">
                            <div class="card-header p-0 position-relative mt-2 mx-2 z-index-2 bg-transparent">
                                <div class="bg-dark shadow-dark border-radius-md p-3">
                                    <h5 class="text-white text-primary mb-0">Contacto</h5>
                                    <p class="text-white text-sm mb-0">
                                        Si tienes alguna pregunta, no dudes en contactarnos.
                                    </p>
                                </div>
                            </div>
                            <div class="card-body">
                                <p class="pb-3">
                                    Por favor, completa el siguiente formulario y te responderemos lo antes posible.
                                </p>
                                <Form :validation-schema="contactoValidationSchema" @submit="eviarMensaje"
                                    id="contact-form" method="post" autocomplete="off">
                                    <div class="card-body p-0 my-3">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Nombre Completo</label>

                                                <div class="input-group input-group-outline ">
                                                    <Field name="nombre_completo" type="text"
                                                        v-model="datosContacto.nombre_completo" class="form-control"
                                                        placeholder="Nombre Completo" />
                                                </div>
                                                <ErrorMessage class="text-danger small " name="nombre_completo" />

                                            </div>
                                            <div class="col-md-6 ps-md-2">
                                                <label>Correo</label>

                                                <div class="input-group input-group-outline ">
                                                    <Field name="email" type="email" v-model="datosContacto.correo"
                                                        class="form-control" placeholder="hello@creative-tim.com" />
                                                </div>
                                                <ErrorMessage class="text-danger small" name="email" />

                                            </div>
                                        </div>
                                        <div class="form-group mb-0 mt-md-0 mt-4">
                                            <label>Mensaje</label>

                                            <div class="input-group input-group-outline ">
                                                <Field as="textarea" name="mensaje" v-model="datosContacto.mensaje"
                                                    class="form-control" id="message" rows="6"
                                                    placeholder="Describe tu problema " />
                                            </div>
                                            <ErrorMessage class="text-danger small" name="mensaje" />
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 text-center">
                                                <button type="submit" class="btn bg-gradient-dark mt-3 mb-0">
                                                    Enviar
                                                    Mensage</button>
                                            </div>

                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>

import { contactoValidationSchema } from '@/modules/public/schemas/contactoValidationSchema.js';

import { Field, Form, ErrorMessage, } from 'vee-validate';

import { createContacto } from '@/services/contactoService.js';

import { reactive } from 'vue';

import Swal from 'sweetalert2';

const datosContacto = reactive({
    nombre_completo: '',
    correo: '',
    mensaje: ''
});


const eviarMensaje = async () => {

    const response = await createContacto(datosContacto);



    datosContacto.nombre_completo = '';
    datosContacto.correo = '';
    datosContacto.mensaje = '';

    Swal.fire(
        'Mensaje Enviado',
        'Gracias por contactarnos, te responderemos pronto.',
        'success'
    );


}



</script>