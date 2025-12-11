import * as yup from 'yup';

export const loginValidationSchema = yup.object({
    email: yup.string().email('El email es inválido').required('El email es requerido'),
    password: yup.string().required('La contraseña es requerida')
})