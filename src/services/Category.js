//Obtener Categories 
const getCategory = async () => {

    const response = await fetch('http://localhost:3001/api/categories')
    const result = await response.json()
    return result
    
}

//Crear una Category
const postCategory = async (data) => {

    const response = await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una Category
const putCategory = async (data) => {

    const response = await fetch('http://localhost:3001/api/categories', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
}

//Modificar una categoria Parcialmente
const patchCategory = async (data) => {

    const response = await fetch('http://localhost:3001/api/categories', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

//Eliminar una Category
const deleteCategory = async (data) => {

    const response = await fetch('http://localhost:3001/api/categories', {
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
    getCategory,
    postCategory,
    putCategory,
    patchCategory,
    deleteCategory
}   