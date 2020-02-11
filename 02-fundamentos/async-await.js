// let getNombre = async() => {
//     //throw new Error('No existe un error para ese usuario');
//     return 'Julian';
// }

let getNombre = () => {
    return new Promise((resolve, reject) => {
        resolve('Julian');
    });
}

getNombre().then(nombre => {
        console.log(nombre);
    })
    .catch(e => {
        console.log('Error de ASYNC', e);
    });

let saludo = async() => {
    let nombre = await getNombre();
    return `Hola ${nombre}`;
}

saludo().then(mensaje => {
    console.log(mensaje);
});