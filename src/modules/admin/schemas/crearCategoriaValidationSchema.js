import * as yup from 'yup';


export const crearCategoriaValidationSchema = yup.object({

    categoria: yup.string().required('La categoria es requerida').min(3, 'La categoria debe tener al menos 3 caracteres'),
    estado: yup.string().required('El estado es requerido'),
})


