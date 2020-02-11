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


    let empleadoDB = empleados.find(empleado => empleado.id === id);
    if (!empleadoDB) {
        throw new Error(`No existe un empleado`)
    } else {
        return empleadoDB;
    }

}


let getSalario = (empleado) => {

    let salarioDB = salarios.find(salario => salario.id === empleado.id);
    if (!salarioDB) {
        throw new Error(`No existe un salario para el empleado solicitado`);
    } else {
        return salarioDB;
    }

}

let getInformacion = async(id) => {
    let empleado = await getEmpleado(id);
    let resp = await getSalario(empleado);
    return `${empleado.nombre} tiene un salario de ${resp.salario}$`;
}

getInformacion(1).then(mensaje => console.log(mensaje)).catch(err => console.log(err));