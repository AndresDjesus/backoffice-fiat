//Crear un vehiculo
const postVehicles = async (data) => {

    const response = await fetch('http://localhost:3001/api/vehicles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un vehiculo totalmente
const putVehicles = async (data) => {

    const response = await fetch('http://localhost:3001/api/vehicles', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}


//Modificar un vehiculo parcialmente
const patchVehicles = async (data) => {

    const response = await fetch('http://localhost:3001/api/vehicles', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un vehiculo
const deleteVehicles = async (data) => {

    const response = await fetch('http://localhost:3001/api/vehicles', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Obtener todos los vehiculos
const getVehicles = async () => {
    const response = await fetch('http://localhost:3001/api/vehicles')
    const result = await response.json()
    return result
}

module.exports = { 
    postVehicles,
    putVehicles,
    patchVehicles,
    deleteVehicles,
    getVehicles
}