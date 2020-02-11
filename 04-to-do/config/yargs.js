const opts = {
    descripcion: {
        alias: 'd',
        demand: true
    }
}

const optActualizar = {
    completado: {
        alias: 'c',
        default: true
    }
}

const argv = require('yargs').command('crear', 'Crea un elemento por hacer',
    opts
).command('actualizar', 'Actualiza el estado completado de una tarea',
    optActualizar
).command('borrar', 'Borra un elemento por hacer',
    opts
).help().argv

module.exports = {
    argv
}