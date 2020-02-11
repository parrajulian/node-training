let empleados = [{
    id: 1,
    nombre: 'Fernando'
}, {
    id: 2,
    nombre: 'Melissa'
}]

let salarios = [{
    id: 1,
    salario: 222
}, {
    id: 2,
    salario: 444
}]

let getEmpleado = (id, callback) => {

    return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find(empleado => empleado.id === id);
        if (!empleadoDB) {
            reject(`No existe un empleado`)
        } else {
            resolve(empleadoDB);
        }
    });


}

let getSalario = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salarios.find(salario => salario.id === empleado.id);
        if (!salarioDB) {
            reject(`No existe un salario para el empleado solicitado`);
        } else {
            resolve(salarioDB);
        }
    });
}

getEmpleado(1).then(empleado => {
    console.log(`El empleado es `, empleado);
    getSalario(empleado).then(salario => {
        console.log(`El salario del empleado es`, salario);
    }, (err) => {
        console.log(err);
    });
}, (err) => {
    console.log(err);
});

getEmpleado(2).then(empleado => {
        return getSalario(empleado);
    })
    .then(resp => {
        console.log(`El salario de Julian es de ${resp.salario}`);
    })
    .catch(err => {
        console.log(err);
    })