//Obtener Insides 
const getInsides = async () => {
    
    const response = await fetch('http://localhost:3001/api/inside')
    const result = await response.json()
    return result
}

//Crear un Inside
const postInside = async (data) => {

    const response = await fetch('http://localhost:3001/api/inside', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Inside 
const putInside = async (data) => {

    const response = await fetch('http://localhost:3001/api/inside', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Inside Parcialmente
const patchInside = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/inside', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un Inside
const deleteInside = async (data) => {

    const response = await fetch('http://localhost:3001/api/inside', {
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
    getInsides,
    postInside,
    putInside,
    patchInside,
    deleteInside 
}