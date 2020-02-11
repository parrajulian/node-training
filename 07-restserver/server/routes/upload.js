const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            error: {
                messsage: 'No se ha seleccionado ningun archivo'
            }
        });
    }

    //Valida tipo

    let tiposValidos = ['productos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las tipos validos son productos y usuarios',
                ext: tipo
            }
        })
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    console.log(extension);

    //Extensiones permitidas

    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son png, jpg, gif, jpeg',
                ext: extension
            }
        })
    }

    //Cambiar nombre al archivo

    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err,
            })

        if (tipo === 'productos') {
            imagenProducto(id, res, nombreArchivo);
        } else if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        }

    });


});


function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo('usuarios', usuarioDB.img);
            return res.status(500).json({
                ok: false,
                err,
            })
        }

        if (!usuarioDB) {
            borraArchivo('usuarios', usuarioDB.img);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            })
        }
        borraArchivo('usuarios', usuarioDB.img);
        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioDB) => {
            res.json({
                ok: true,
                usuario: usuarioDB,
                img: nombreArchivo
            })
        })

    })
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borraArchivo('productos', productoDB.img);
            return res.status(500).json({
                ok: false,
                err,
            })
        }

        if (!productoDB) {
            borraArchivo('productos', productoDB.img);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            })
        }
        borraArchivo('productos', productoDB.img);
        productoDB.img = nombreArchivo;
        productoDB.save((err, productoDB) => {
            res.json({
                ok: true,
                producto: productoDB,
                img: nombreArchivo
            })
        })

    })

}

function borraArchivo(tipo, nombreImagen) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;