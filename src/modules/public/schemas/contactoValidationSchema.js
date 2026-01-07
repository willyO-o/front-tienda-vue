import * as yup from 'yup';

export const contactoValidationSchema = yup.object({
    nombre_completo: yup.string().required('El nombre completo es requerido').min(3, 'El nombre completo debe tener al menos 3 caracteres'),
    email: yup.string().email('El email es inválido').required('El email es requerido'),
    mensaje: yup.string().required('El mensaje es requerido').min(10, 'El mensaje debe tener al menos 10 caracteres'),
})



