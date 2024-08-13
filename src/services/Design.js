//Obtener Designs
const getDesigns = async () => {
    
    const response = await fetch('http://localhost:3001/api/design')
    const result = await response.json()
    return result
}

//Crear un Design
const postDesign = async (data) => {    

    const response = await fetch('http://localhost:3001/api/design', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Design
const putDesign = async (data) => {

    const response = await fetch('http://localhost:3001/api/design', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar un Design parcialmente
const patchDesign = async (data) => {
    
    const response = await fetch('http://localhost:3001/api/design', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Eliminar un Design
const deleteDesign = async (data) => {  

    const response = await fetch('http://localhost:3001/api/design', {
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
    getDesigns,
    postDesign,
    putDesign,
    patchDesign,
    deleteDesign 
    }