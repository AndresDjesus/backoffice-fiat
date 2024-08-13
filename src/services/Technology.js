//Obtener Technologies 
const getTechnology = async () => {

    const response = await fetch('http://localhost:3001/api/technology')
    const result = await response.json()
    return result
}

//Crear una Technology
const postTechnology = async (data) => {

    const response = await fetch('http://localhost:3001/api/technology', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una Technology
const putTechnology = async (data) => {

    const response = await fetch('http://localhost:3001/api/technology', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una Technology Parcialmente
const patchTechnology = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/technology', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar una Technology
const deleteTechnology = async (data) => {

    const response = await fetch('http://localhost:3001/api/technology', {
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
    getTechnology,
    postTechnology,
    putTechnology,
    patchTechnology,
    deleteTechnology 
}