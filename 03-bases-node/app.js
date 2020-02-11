const argv = require('./config/yargs').argv
const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar');

let comando = argv._[0];

switch (comando) {
    case 'listar':
        listarTabla(argv.base, argv.limite)
        break;

    case 'crear':
        crearArchivo(argv.base, argv.limite).then(archivo => console.log(`Archivo creado ${archivo}`)).catch(err => console.log('El valor introducido no es un numero'));
        break;
    default:
        console.log('Comando no reconocido');
}
//let parametro = argv[2];
//let base = parametro.split('=')[1];

//crearArchivo(base).then(archivo => console.log(`Archivo creado ${archivo}`)).catch(err => console.log('El valor introducido no es un numero'));