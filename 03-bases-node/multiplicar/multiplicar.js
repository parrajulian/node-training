const fs = require('fs');
var color = require('colors');
let listarTabla = (base, limite) => {
    data = '';
    for (let i = 1; i <= limite; i++) {
        data += (`${base} * ${i} = ${base * i}\n`);
    }
    console.log(data.green);
}

let crearArchivo = (base, limite) => {

    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject('No es un número');
            return;
        }
        let data = '';
        for (let i = 1; i <= limite; i++) {
            data += (`${base} * ${i} = ${base * i}\n`);
        }

        fs.writeFile(`tablas/tabla-${base}.txt`, data, (err) => {
            if (err) reject(err);
            else
                resolve(`tabla-${base}.txt`);
        });
    })
}

module.exports = {
    crearArchivo,
    listarTabla
}