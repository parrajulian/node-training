const argv = require('./config/yargs').argv;
const porHacer = require('./to-do/to-do');
var colors = require('colors');
console.log(argv);

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.listado();
        for (let tarea of listado) {
            console.log(tarea.listado);
            console.log('================'.green)
            console.log(tarea.descripcion);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no es reconocido');
}