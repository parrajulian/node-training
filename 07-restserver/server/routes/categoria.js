const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middleware/autenticacion');

let app = express();

let Categoria = require('../models/categoria');


// ====
// MOSTRAR TODAS LAS CATEGORIAS

app.get('/categoria', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);
    Categoria.find({}).sort('descripcion').populate('usuario', 'nombre email').skip(desde).limit(limite).exec((err, categorias) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        Categoria.count({
            estado: true
        }, (err, conteo) => {
            res.json({
                ok: true,
                categorias,
                cuantos: conteo
            })
        })

    });
});


//MOSTRAR UNA CATEGORIA POR ID

app.get('/categoria/:id', verificaToken, (req, res) => {
    let categoria_id = req.params.id;
    Categoria.findById(categoria_id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                message: {
                    err: 'No se encontró la categoría'
                }
            })
        }

        return res.json({
            ok: true,
            categoriaDB
        })
    })
});

//CREAR UNA NUEVA CATEGORIA

app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria
    // req.usuario._id

    let body = req.body;

    console.log(req.usuario);
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})


app.put('/categoria/:id', [verificaToken], (req, res) => {
    let body = req.body;
    let categoria_id = req.params.id;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(
        categoria_id,
        descCategoria, { new: true, runValidators: true },
        (err, categoriaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.json({
                ok: true,
                categoria: categoriaDB
            })
        })


});

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

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