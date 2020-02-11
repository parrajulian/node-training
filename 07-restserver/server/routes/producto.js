const express = require('express');

let { verificaToken } = require('../middleware/autenticacion');

let app = express();

let Producto = require('../models/producto');

// ====
// MOSTRAR TODOS LOS PRODUCTOS

app.get('/producto', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);
    Producto.find({}).sort('descripcion').populate(['usuario', 'categoria']).skip(desde).limit(limite).exec((err, productos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        Producto.count((err, conteo) => {
            res.json({
                ok: true,
                productos,
                cuantos: conteo
            })
        })

    });
});


//MOSTRAR UN PRODUCTO POR ID

app.get('/producto/:id', verificaToken, (req, res) => {
    let producto_id = req.params.id;
    Producto.findById(producto_id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: {
                    err: 'No se encontró el producto'
                }
            })
        }

        return res.json({
            ok: true,
            productoDB
        })
    }).populate(['usuario', 'categoria'])
});


//BUSCAR UN PRODUCTO

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');
    Producto.find({ nombre: regex }).populate('categoria', 'nombre').exec((err, productos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            productos
        })
    })
})

//CREAR UN NUEVO PRODUCTO

app.post('/producto', verificaToken, (req, res) => {
    //regresa el nuevo producto
    // req.usuario._id

    let body = req.body;
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            producto: productoDB
        })
    })
})


app.put('/producto/:id', [verificaToken], (req, res) => {
    let body = req.body;
    let producto_id = req.params.id;

    Producto.findById(
        producto_id,
        (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            } else {
                productoDB.nombre = body.nombre;
                productoDB.precioUni = body.precioUni;
                productoDB.categoria = body.categoria;
                productoDB.disponible = body.disponible;
                productoDB.descripcion = body.descripcion;

                productoDB.save((err, productoDB) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        })
                    }
                    return res.json({
                        ok: true,
                        producto: productoDB
                    })
                })

            }

        })


});

app.delete('/categoria/:id', [verificaToken], (req, res) => {

    //solo un administrador puede borrar categorias

    let categoria_id = req.params.id;

    Categoria.findByIdAndRemove(categoria_id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (categoriaBorrada === null) {
            return res.status(400).json({
                ok: false,
                message: {
                    err: 'Categoria no encontrada'
                }
            })
        } else {
            res.json({
                ok: true,
                categoria: categoriaBorrada
            });
        }
    })

})





module.exports = app;