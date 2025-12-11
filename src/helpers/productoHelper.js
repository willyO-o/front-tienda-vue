

const getImagenPrincipal= (imagenes)=>{

    const arrayImagenes= JSON.parse(imagenes);
    return arrayImagenes[0];

}

const recortarTexto= (texto, cantidadCaracteres)=>{

    return texto.substring(0, cantidadCaracteres) + '...';

}



export {getImagenPrincipal, recortarTexto}