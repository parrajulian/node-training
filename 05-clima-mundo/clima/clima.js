const axios = require('axios');

const getClima = async(lat, lng) => {
    const resp = await axios.get(`http://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b6907d289e10d714a6e88b30761fae22`);
    return resp.data.main.temp;
}

module.exports = {
    getClima
}