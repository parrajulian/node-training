const axios = require('axios');
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: "Direccion de la ciudad para obtener el clima",
        demand: true

    }
}).argv;

// lugar.getLugarLatLng(argv.direccion).then(resp => console.log(resp));

// clima.getClima(40.750000, -74.000000).then(console.log).catch(console.log);

const getInfo = async(direccion) => {

    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${direccion} es ${temp}`
    } catch (e) {
        console.log(`Ocurrio un error`, e);
    }



}

getInfo(argv.direccion).then(console.log).catch(console.log);