import * as yup from 'yup';


export const crearProdutoValidationSchema = yup.object({
    titulo: yup.string().required('El titulo es requerido').min(3, 'El titulo debe tener al menos 3 caracteres'),
    descripcion: yup.string().required('La descripcion es requerida').min(10, 'La descripcion debe tener al menos 10 caracteres'),
    precio: yup.string().required('El precio es requerido'),
    categoria_id: yup.number().required('La categoria es requerida').positive('La categoria es requerida'),
    // imagen: yup.mixed().required('Ingrese almenos una imagen'),
    stock: yup.string(),

})


