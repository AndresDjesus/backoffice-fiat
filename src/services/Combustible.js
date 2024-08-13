//Obtener Combustibles

const getCombustible = async () => {

    const response = await fetch('http://localhost:3001/api/combustible')
    const result = await response.json()
    return result
}

//Crear un Combustible
const postCombustible = async (data) => {

    const response = await fetch('http://localhost:3001/api/combustible', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Combustible
const putCombustible = async (data) => {

    const response = await fetch('http://localhost:3001/api/combustible', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Combustible parcialmente
const patchCombustible = async (data) => {

    const response = await fetch('http://localhost:3001/api/combustible', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un Combustible
const deleteCombustible = async (data) => {

    const response = await fetch('http://localhost:3001/api/combustible', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

module.exports = { 
    getCombustible,
    putCombustible,
    patchCombustible,
    deleteCombustible,
    postCombustible
 }
